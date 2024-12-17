from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from pymongo import MongoClient
from datetime import datetime
from django.conf import settings

# MongoDB connection
client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
db = client["SAMS"]  # Replace with your database name
Student_list = db["student"]
Attendance_list = db["Attendance"]

@csrf_exempt
def add_student(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            student_data = {
                "registerNumber": data.get("registerNumber"),
                "name": data.get("name"),
                "mobileNumber": data.get("mobileNumber"),
                "department": data.get("department"),
                "dob": data.get("dob"),
            }
            Student_list.insert_one(student_data)
            return JsonResponse({"message": "Student added successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)

def get_students(request):
    if request.method == 'GET':
        try:
            students = list(Student_list.find({}, {"_id": 0}).sort("registerNumber", 1))
            return JsonResponse({"students": students}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
def attendance_list(request):
    if request.method == 'GET':
        try:
            # Get current date in the desired format
            date = datetime.now().strftime('%Y-%m-%d')
            
            # Query to fetch attendance for the current date
            query = {"date": date}
            
            # Fetch records from the collection
            attendance = list(Attendance_list.find(query, {"_id": 0}))
            
            # Return the attendance data
            return JsonResponse({"attendance": attendance}, status=200)
        except Exception as e:
            # Handle and log exceptions
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)