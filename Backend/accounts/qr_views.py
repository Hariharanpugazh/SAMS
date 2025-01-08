import pymongo
import qrcode
import base64
from io import BytesIO
from datetime import datetime, timedelta
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from haversine import haversine
from datetime import timezone
import logging

logger = logging.getLogger(__name__)

# MongoDB Client
client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
db = client['SAMS']
qr_collection = db['qr_codes']

@csrf_exempt
def generate_qr_code(request):
    try:
        if request.method == "POST":
            payload = json.loads(request.body)
            class_name = payload.get("class_name", "N/A")
            latitude = payload.get("latitude", 0.0)
            longitude = payload.get("longitude", 0.0)
            expiry_minutes = int(payload.get("expiry_minutes", 10))

            expiry_time = datetime.now() + timedelta(minutes=expiry_minutes)

            # QR Code Data
            qr_data = {
                "class_name": class_name,
                "geolocation": {"latitude": latitude, "longitude": longitude},
                "radius": 100,
                "timestamp": datetime.now().isoformat(),
                "expiry": expiry_time.isoformat(),
            }

            qr_data_base64 = base64.b64encode(json.dumps(qr_data).encode()).decode()
            frontend_url = f"https://sams-coral-beta.vercel.app/validate?data={qr_data_base64}"

            qr = qrcode.make(frontend_url)
            buffer = BytesIO()
            qr.save(buffer, format="PNG")
            qr_image_base64 = base64.b64encode(buffer.getvalue()).decode()

            return JsonResponse({
                "qr_code": qr_image_base64,
                "expiry": expiry_time,
                "message": "QR Code generated successfully"
            })

        return JsonResponse({"error": "Invalid request method"}, status=400)
    except Exception as e:
        logger.error(f"Error in generate_qr_code: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)


# Function 2 and 3: Receive Student Info and Verify Attendance
@csrf_exempt
def validate_attendance(request):
    if request.method == "POST":
        data = json.loads(request.body)
        student_id = data.get("student_id")
        student_name = data.get("student_name")
        student_location = data.get("geolocation")  # {"latitude": ..., "longitude": ...}
        qr_code_data = data.get("qr_code_data")  # Scanned QR code data

        if not all([student_id, student_name, student_location, qr_code_data]):
            return JsonResponse({"error": "Incomplete data provided"}, status=400)

        try:
            # Parse QR Code Data
            qr_data = json.loads(qr_code_data)

            # Check QR Code Expiry
            expiry_str = qr_data["expiry"].replace("Z", "+00:00")  # Replace 'Z' with UTC format
            expiry_time = datetime.fromisoformat(expiry_str)
            if datetime.now(timezone.utc) > expiry_time:
                return JsonResponse({"status": "expired", "message": "QR Code has expired"})

            # Validate Geolocation
            qr_location = (qr_data["geolocation"]["latitude"], qr_data["geolocation"]["longitude"])
            student_loc = (student_location["latitude"], student_location["longitude"])
            radius = qr_data["radius"]

            distance = haversine(qr_location, student_loc, unit="m")  # Distance in meters
            if distance > radius:
                return JsonResponse({"status": "outside_radius", "message": "You are outside the valid area"})

            # Save preliminary attendance record
            attendance_record = {
                "student_id": student_id,
                "student_name": student_name,
                "timestamp": datetime.now().isoformat(),
                "status": "face_pending"  # Pending face detection
            }
            qr_collection.insert_one(attendance_record)

            return JsonResponse({
                "status": "pending_face",
                "message": "Geolocation verified. Proceed with face detection.",
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
