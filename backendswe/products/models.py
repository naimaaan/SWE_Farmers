from django.db import models
from users.models import FarmerProfile

class Product(models.Model):
    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    description = models.TextField()
    sales_count = models.IntegerField(default=0)  # Track the number of products sold

    def __str__(self):
        return self.name

    def update_sales_count(self, quantity):
        """Update the sales count after a successful order, ensuring it does not go negative."""
        new_sales_count = self.sales_count + quantity
        if new_sales_count < 0:
            raise ValueError("Sales count cannot be negative.")
        self.sales_count = new_sales_count
        self.save()



class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images"  # Ensure this related_name exists
    )
    image_url = models.TextField()

    def __str__(self):
        return f"Image for product {self.product.name}"