from .models import CreatePost
from django import forms

class CreatePostform(forms.ModelForm): 
    class Meta:
        model = CreatePost
        fields = fields = ('title',
                   'image',
                  'content',)
