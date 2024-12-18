from django.urls import path
from .user_views import register, login
from .qr_views import generate_qr_code, validate_attendance
from .attendance_views import present_attendance
from django.views.generic import RedirectView
from .student_views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),    

    #admin dashboard
    path('addstudent/', add_student, name='add_student'),
    path('getstudents/', get_students, name='get_students'),
    path('attendance/', attendance_list, name='attendance_list'),
    path('entry/', present_attendance, name='present_attendance'),
    #Qr_code
    path('api/generate_qr/', generate_qr_code, name="generate_qr_code"),
    path('api/validate_attendance/', validate_attendance, name="validate_attendance"),
    path('favicon.ico', RedirectView.as_view(url='/static/favicon.ico', permanent=True)),
]
