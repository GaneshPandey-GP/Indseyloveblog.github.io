from django.contrib import admin
from .models import CreatePost, Comment
# Register your models here.

admin.site.register(CreatePost)

class CommentAdmin(admin.ModelAdmin): 
    list_display= ("post", "name", "email", "publish_date", "status")
    list_filter = ("status", "publish_date")
    search_fields = ("name", "email", "content")
admin.site.register(Comment,CommentAdmin)