# orders/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrdersViewSet

router = DefaultRouter()
router.register(r'', OrdersViewSet, basename='orders')  # Remove the extra 'orders' path

urlpatterns = [
    path('', include(router.urls)),  # Register all ViewSet routes under /orders/
]
