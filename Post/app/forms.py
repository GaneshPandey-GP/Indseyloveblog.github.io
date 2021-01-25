from .models import CreatePost,Comment
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from mptt.forms import TreeNodeChoiceField
class CreatePostform(forms.ModelForm): 
    class Meta:
        model = CreatePost
        fields = fields = ('title',
                   'image',
                  'content',)

class CommentForm(forms.ModelForm): 
    parent  = TreeNodeChoiceField(queryset=Comment.objects.all())
    def __init__(self, *args, **kwargs): 
        super().__init__(*args, **kwargs)
        self.fields['parent'].required = False
        self.fields['parent'].label = ""
        self.fields['parent'].widget.attrs.update({'class':'d-none'}) 

    class Meta: 
        model = Comment
        fields = ('parent','content',) 
        widgets ={
           
            'content':forms.Textarea(attrs={'class':'form-control mb-3  border-0  rounded border-bottom-0 border border-primary','rows':'5','placeholder':'Write your message...'})
        }


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']
        