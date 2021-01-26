from django.contrib import admin
from .models import SubscribeModel,Comment
from mptt.admin import MPTTModelAdmin

admin.site.register(Comment,MPTTModelAdmin)

admin.site.register(SubscribeModel)