from django import forms
from .models import SubscribeModel


class EmailSignupForm(forms.ModelForm):
    email = forms.EmailField(widget=forms.TextInput(attrs={
        "type": "email",
        "name": "email",
        "id": "email",
        "placeholder": "Type your email address",
        "class":"input"
    }), label="")

    class Meta:
        model = SubscribeModel
        fields = ('email', )
