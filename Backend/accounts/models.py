# accounts/models.py
from djongo import models

class Users(models.Model):
    user_id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # Hashed password
    role = models.CharField(
        max_length=10, 
        choices=[('admin', 'Admin'), ('student', 'Student')]
    )
    registered_at = models.DateTimeField()

    def __str__(self):
        return self.name
