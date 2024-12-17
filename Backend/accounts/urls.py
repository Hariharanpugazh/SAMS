from django.urls import path
from .user_views import register, login
from .student_views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('addstudent/', add_student, name='add_student'),
    path('getstudents/', get_students, name='get_students'),
    path('attendance/', attendance_list, name='attendance_list'),

]
