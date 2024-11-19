from django.shortcuts import render 
from rest_framework.response import Response 
from rest_framework.views import APIView 
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import IsAuthenticated 
from .models import CustomUser, FarmerProfile, BuyerProfile
from .serializers import BuyerProfileSerializer, UserSerializer, FarmerProfileSerializer, RegisterSerializer, ProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
import logging

logger = logging.getLogger(__name__)



class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            logger.info(f"New user registered: {user.username}")
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        logger.warning(f"Registration failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

class CustomUserViewSet(ModelViewSet):
    """
    A viewset for viewing and editing CustomUser instances.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class FarmerViewSet(ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing farmers.
    """
    queryset = FarmerProfile.objects.all()
    serializer_class = FarmerProfileSerializer
    permission_classes = [IsAuthenticated]

class BuyerViewSet(ModelViewSet):
    queryset = BuyerProfile.objects.all()
    serializer_class = BuyerProfileSerializer
    permission_classes = [IsAuthenticated]

class DashboardStatsView(APIView): 
    permission_classes = [IsAdminUser] 

    def get(self, request): 
        total_users = CustomUser.objects.count() 
        pending_farmers = FarmerProfile.objects.filter(is_approved=False).count() 
        disabled_accounts = CustomUser.objects.filter(is_disabled=True).count() 
        return Response({ 
            'totalUsers': total_users, 
            'pendingFarmers': pending_farmers, 
            'disabledAccounts': disabled_accounts, 
        }) 

class PendingFarmersView(APIView): 
    permission_classes = [IsAdminUser] 

    def get(self, request): 
        pending_farmers = FarmerProfile.objects.filter(is_approved=False) 
        serializer = FarmerProfileSerializer(pending_farmers, many=True) 
        return Response(serializer.data) 

from django.shortcuts import get_object_or_404

class ApproveFarmerView(APIView): 
    permission_classes = [IsAdminUser] 

    def post(self, request): 
        farmer_id = request.data.get('id') 
        farmer = get_object_or_404(FarmerProfile, id=farmer_id)
        farmer.is_approved = True 
        farmer.save() 
        # Send notification to farmer (optional) 
        return Response({'status': 'Farmer approved'}) 

class RejectFarmerView(APIView): 
    permission_classes = [IsAdminUser] 

    def post(self, request): 
        farmer_id = request.data.get('id') 
        feedback = request.data.get('feedback') 
        farmer = get_object_or_404(FarmerProfile, id=farmer_id)
        # Send feedback to farmer (e.g., via email) 
        farmer.user.delete()  # Remove the user account 
        return Response({'status': 'Farmer rejected and account deleted'}) 

class UpdateUserStatusView(APIView): 
    permission_classes = [IsAdminUser] 

    def post(self, request): 
        user_id = request.data.get('id') 
        status = request.data.get('status') 
        user = get_object_or_404(CustomUser, id=user_id)
        user.is_disabled = True if status == 'Disabled' else False 
        user.save() 
        return Response({'status': f'User status updated to {status}'})

class CreateBuyerProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def post(self, request):
        serializer = BuyerProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            buyer_profile = serializer.save()
            return Response({
                'status': 'Buyer profile created successfully',
                'buyer_profile': BuyerProfileSerializer(buyer_profile).data
            }, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UsersListView(APIView): 
    permission_classes = [IsAdminUser] 

    def get(self, request): 
        users = CustomUser.objects.all() 
        serializer = UserSerializer(users, many=True) 
        return Response(serializer.data) 
