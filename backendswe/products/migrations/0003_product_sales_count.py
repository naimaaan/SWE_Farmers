# Generated by Django 5.1.3 on 2024-12-02 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="sales_count",
            field=models.IntegerField(default=0),
        ),
    ]
