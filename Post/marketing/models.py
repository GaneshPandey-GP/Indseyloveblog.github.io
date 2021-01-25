from django.db import models

# Create your models here.
class SubscribeModel(models.Model):
    email = models.EmailField(null=False, blank=True, max_length=200, unique=True)
    created_date = models.DateTimeField(null=False, blank=True,auto_now_add=True)

    def __str__(self):
        return self.email
