from django.contrib import admin
from .models import CreatePost
from mptt.admin import MPTTModelAdmin

admin.site.register(CreatePost)

# class CommentAdmin(admin.ModelAdmin): 
#     list_display= ("post", "name", "email", "publish_date", "status")
#     list_filter = ("status", "publish_date")
#     search_fields = ("name", "email", "content")

