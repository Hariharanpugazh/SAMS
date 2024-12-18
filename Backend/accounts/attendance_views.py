import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from geopy.distance import geodesic
import pymongo
from datetime import datetime

# MongoDB connection setup
client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
db = client['SAMS']  # Access database
attendance_collection = db['Attendance']  # Collection name

@csrf_exempt
def present_attendance(request):
    if request.method == 'POST':
        try:
            # Parse data from POST request
            data = json.loads(request.body)
            qr_latitude = float(data.get('qr_latitude'))
            qr_longitude = float(data.get('qr_longitude'))
            student_latitude = float(data.get('student_latitude'))
            student_longitude = float(data.get('student_longitude'))
            register_number = data.get('register_number')
            student_name = data.get('student_name')

            # Calculate distance between QR code location and student's current location
            qr_location = (qr_latitude, qr_longitude)
            student_location = (student_latitude, student_longitude)
            distance = geodesic(qr_location, student_location).meters  # Distance in meters

            # Define acceptable radius (e.g., 10 meters)
            ACCEPTABLE_RADIUS = 10.0

            # Determine attendance status
            status = "Present" if distance <= ACCEPTABLE_RADIUS else "Absent"

            # Prepare the attendance record
            attendance_record = {
                "register_number": register_number,
                "student_name": student_name,
                "latitude": student_latitude,
                "longitude": student_longitude,
                "status": status,
                "timestamp": datetime.now().isoformat()
            }

            # Insert record into MongoDB collection
            attendance_collection.insert_one(attendance_record)

            # Return response
            return JsonResponse({
                'message': 'Attendance validated successfully',
                'status': status,
                'distance': round(distance, 2)
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
