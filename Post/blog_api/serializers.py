from app.models import CreatePost
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatePost
        fields ='__all__'