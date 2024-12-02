# products/admin.py

from django.contrib import admin
from .models import Product, ProductImage
from .forms import ProductForm  # Import the custom ProductForm

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_url:
            return format_html(f'<img src="{obj.image_url}" style="max-height: 100px;"/>')
        return "No image available"

    image_preview.short_description = "Image Preview"

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductForm  # Use the custom form with validation
    list_display = ('name', 'category', 'price', 'quantity', 'farmer')
    list_filter = ('category', 'farmer')
    search_fields = ('name', 'description')
    inlines = [ProductImageInline]  # Include inline for images
