from django.db import models
from app.models import CreatePost
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from mptt.models import MPTTModel,TreeForeignKey
from django.urls import reverse
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import re
from django.conf import settings

class Comment(MPTTModel): 
    user            =     models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)
    post            =     models.ForeignKey(CreatePost,on_delete=models.CASCADE,blank=True,null=True,related_name="comments")
    parent          =     TreeForeignKey('self',on_delete=models.CASCADE,blank=True,null=True,related_name="children")
    slug            =     models.SlugField()
    email           =     models.EmailField()
    content         =     models.TextField()
    publish_date    =     models.DateTimeField(auto_now_add=True)
    status          =     models.BooleanField(default=True)

    class MPTTMeta: 
        order_insertion_by = ['publish_date']
 
    def __str__(self): 
        return f'comment by {self.user} in {self.post}' 

 

    def get_absoulte_url(self):
        return reverse("postview",kwargs={"slug":self.slug})    


class SubscribeModel(models.Model):
    email = models.EmailField(null=False, blank=True, max_length=200, unique=True)
    created_date = models.DateTimeField(null=False, blank=True,auto_now_add=True)

    def __str__(self):
        return self.email


def create_comment_slug(instance,new_slug=None):
    slug = slugify(instance.post)
    if new_slug is not None:
        slug = new_slug
    qs = Comment.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" %(slug,qs.first().id)
        return create_comment_slug(instance,new_slug=new_slug)
    res = re.findall(r'\w+', slug)
    return res[0]

def pre_save_post_receive(sender,instance,*args,**kwargs):
    if not instance.slug:
        instance.slug = create_comment_slug(instance)
    

pre_save.connect(pre_save_post_receive,sender=Comment) 

