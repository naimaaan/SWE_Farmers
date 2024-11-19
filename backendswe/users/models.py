from django.contrib.auth.models import AbstractUser 
from django.db import models 
from django.core.validators import RegexValidator 

class CustomUser(AbstractUser): 
    ROLE_CHOICES = ( 
        ('admin', 'Admin'), 
        ('farmer', 'Farmer'), 
        ('buyer', 'Buyer'), 
    ) 
    role = models.CharField(max_length=10, choices=ROLE_CHOICES) 
    is_disabled = models.BooleanField(default=False) 
    phone_number = models.CharField( 
        max_length=15, 
        unique=True, 
        null=True, 
        validators=[RegexValidator(r'^\+?1?\d{9,15}$', 'Enter a valid phone number.')], 
    ) 
    email = models.EmailField(max_length=255, unique=True) 

    def __str__(self):  # Correct method name
        return self.username 

class BuyerProfile(models.Model): 
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="buyer_profile") 
    delivery_address = models.CharField(max_length=255) 

    def __str__(self): 
        return f"Buyer Profile of {self.user.username}" 

class FarmerProfile(models.Model): 
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="farmer_profile") 
    farm_size = models.CharField(max_length=100) 
    location = models.CharField(max_length=255) 
    is_approved = models.BooleanField(default=False) 
    rejection_reason = models.TextField(null=True, blank=True) 

    def __str__(self):  # Remove the incorrect `str` method
        return f"Farmer Profile of {self.user.username}"
