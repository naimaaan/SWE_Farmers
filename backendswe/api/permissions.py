from rest_framework.permissions import BasePermission

class IsFarmer(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'farmer'

class IsBuyer(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'buyer'
