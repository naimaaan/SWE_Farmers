from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer
from products.models import Product
from users.models import BuyerProfile


class OrdersViewSet(ModelViewSet):
    """
    A ViewSet for handling orders. 
    - Authenticated users can list, retrieve, and create orders.
    - Orders are linked to the authenticated user's BuyerProfile.
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Return orders for the authenticated user's BuyerProfile.
        """
        try:
            buyer = BuyerProfile.objects.get(user=self.request.user)
            return Order.objects.filter(buyer=buyer).order_by('-order_date')
        except BuyerProfile.DoesNotExist:
            return Order.objects.none()  # Return no orders if BuyerProfile is missing

    def create(self, request, *args, **kwargs):
        """
        Handle order creation.
        - Ensure the product exists and has sufficient stock.
        - Link the order to the authenticated user's BuyerProfile.
        """
        buyer = BuyerProfile.objects.filter(user=request.user).first()
        if not buyer:
            return Response(
                {"error": "You must have a BuyerProfile to place orders."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')

        if not product_id or not quantity:
            return Response(
                {"error": "Both 'product_id' and 'quantity' fields are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        if product.quantity < int(quantity):
            return Response({"error": "Insufficient stock."}, status=status.HTTP_400_BAD_REQUEST)

        total_price = product.price * int(quantity)

        # Create the order
        order = Order.objects.create(
            buyer=buyer,
            product=product,
            quantity=quantity,
            total_price=total_price,
        )

        # Reduce product stock
        product.quantity -= int(quantity)
        product.save()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)