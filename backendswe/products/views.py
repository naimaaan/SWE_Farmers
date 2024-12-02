from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer
from users.permissions import IsFarmer
from rest_framework.response import Response


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsFarmer]  # Only farmers can access

    def get_queryset(self):
        """
        Optionally filter products by location.
        """
        queryset = Product.objects.all()

        # Filter by farmer's location if provided
        location = self.request.query_params.get('location')
        if location:
            queryset = queryset.filter(farmer__location__icontains=location)

        # Restrict products to those owned by the authenticated farmer
        if self.request.user.is_farmer():
            queryset = queryset.filter(farmer=self.request.user.farmer_profile)

        return queryset

class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()  # Default to all products

    def get_queryset(self):
        """
        Advanced filtering and sorting for products.
        """
        queryset = super().get_queryset()

        # Filtering by price range
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        # Filtering by farm location
        location = self.request.query_params.get("location")
        if location:
            queryset = queryset.filter(farmer__location__icontains=location)

        # Sorting options
        sort_by = self.request.query_params.get("sort_by")
        if sort_by == "price_asc":
            queryset = queryset.order_by("price")
        elif sort_by == "price_desc":
            queryset = queryset.order_by("-price")
        elif sort_by == "newest":
            queryset = queryset.order_by("-id")  # Assuming 'id' represents the newest entries
        elif sort_by == "popularity":
            queryset = queryset.order_by("sales_count")  # Replace 'quantity' with actual popularity logic if needed

        return queryset

class AddProductView(APIView):
    permission_classes = [IsAuthenticated, IsFarmer]  # Restrict to authenticated farmers

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(farmer=request.user.farmer_profile)  # Ensure the farmer is linked
            return Response({
                "message": "Product added successfully!",
                "product": serializer.data
            }, status=201)
        return Response(serializer.errors, status=400)