from .models import CreatePost,Comment
from django import forms

class CreatePostform(forms.ModelForm): 
    class Meta:
        model = CreatePost
        fields = fields = ('title',
                   'image',
                  'content',)

class CommentForm(forms.ModelForm): 
    class Meta: 
        model = Comment
        fields = fields = ('name','email','content',) 
        widgets ={
            'name':forms.TextInput(attrs={'class':'col-sm-12','placeholder':'Your Name...','rows':"3"}),
            'email':forms.TextInput(attrs={'class':'col-sm-12','placeholder':'Enter Your Email...'}),
            'content':forms.Textarea(attrs={'class':'form-control','placeholder':'Write your message...'})
        }