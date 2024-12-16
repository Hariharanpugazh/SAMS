from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import pymongo
import json
from datetime import datetime

# Connect to MongoDB
client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
db = client['SAMS']  # Access database
users_collection = db['Users']  # Access Users collection

@csrf_exempt
def register(request):
    """
    Handles user registration.
    Accepts user_id from input and stores passwords in plain text.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Extract fields
            user_id = data.get('user_id')
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            # Validate input
            if not all([user_id, name, email, password]):
                return JsonResponse({'error': 'All fields are required'}, status=400)

            # Check for duplicate email
            if users_collection.find_one({'email': email}):
                return JsonResponse({'error': 'Email already registered'}, status=400)

            # Insert new user
            new_user = {
                "user_id": user_id,
                "name": name,
                "email": email,
                "password": password,  # Plain-text password
                "role": "student",  # Default role
                "registered_at": datetime.utcnow().isoformat()
            }
            users_collection.insert_one(new_user)

            return JsonResponse({'message': 'Student registered successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def login(request):
    """
    Handles user login.
    Validates email and plain-text password.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Extract fields
            email = data.get('email')
            password = data.get('password')

            # Validate input
            if not all([email, password]):
                return JsonResponse({'error': 'Email and password are required'}, status=400)

            # Find user by email
            user = users_collection.find_one({'email': email})
            if not user:
                return JsonResponse({'error': 'Invalid email or password'}, status=401)

            # Verify password
            if password != user['password']:
                return JsonResponse({'error': 'Invalid email or password'}, status=401)

            # Success response
            return JsonResponse({
                'message': 'Login successful',
                'role': user['role'],  # Send the role directly
                'user': {
                    'user_id': user['user_id'],
                    'name': user['name'],
                    'email': user['email']
                }
            }, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
