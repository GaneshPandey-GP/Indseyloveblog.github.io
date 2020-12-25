from django.db.models.signals import post_save
from django.contrib.auth.models import User,Group
from .models import *

def user_profile(sender,instance,created,**kwargs):
     if created:
        group = Group.objects.get(name='reader')
        instance.groups.add(group)
        print('Profile Created!!')
post_save.connect(user_profile,sender=User)        