from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import FarmerViewSet, BuyerViewSet, CustomUserViewSet

router = DefaultRouter()
router.register(r'farmers', FarmerViewSet, basename='farmers')
router.register(r'buyers', BuyerViewSet, basename='buyers')
router.register(r'customusers', CustomUserViewSet, basename='customusers')

urlpatterns = [
    # Authentication Endpoints
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('create_buyer_profile/', views.CreateBuyerProfileView.as_view(), name='create_buyer_profile'),

    # Admin Endpoints
    path('admin/dashboard-stats/', views.DashboardStatsView.as_view(), name='dashboard_stats'),
    path('admin/pending-farmers/', views.PendingFarmersView.as_view(), name='pending_farmers'),
    path('admin/approve-farmer/', views.ApproveFarmerView.as_view(), name='approve_farmer'),
    path('admin/reject-farmer/', views.RejectFarmerView.as_view(), name='reject_farmer'),
    path('admin/users/', views.UsersListView.as_view(), name='users_list'),
    path('admin/update-user-status/', views.UpdateUserStatusView.as_view(), name='update_user_status'),

    path('', include(router.urls)),
]
