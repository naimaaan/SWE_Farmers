from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        sales_count = cleaned_data.get('sales_count')

        if sales_count < 0:
            raise forms.ValidationError("Sales count cannot be negative.")

        return cleaned_data