# Generated by Django 3.1.3 on 2021-01-25 02:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20210125_0757'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Comment',
        ),
    ]