from django.db import models
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from mptt.models import MPTTModel,TreeForeignKey
from django.urls import reverse
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import re
from django.conf import settings

class CreatePost(models.Model):
    title           =     models.CharField(max_length=40)
    image           =     models.ImageField(upload_to='',null=True,blank=True)
    content         =     models.TextField()
    slug            =     models.SlugField(unique=True)
    publish_date    =     models.DateTimeField(auto_now_add=True)
    author          =     models.CharField(max_length=100,default="Admin")
    likes           =     models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True, related_name='blogpost_like')
    like_count     =      models.BigIntegerField(default='0')

    def __str__(self): 
        return self.title
   
    def number_of_likes(self):
        return self.likes.count()     
   
    @property
    def get_comments(self):
        return self.comments.all().filter(status=True)
 
    def get_post_absoulte_url(self):
        return reverse("postview",kwargs={"slug":self.slug})    

class Comment(MPTTModel): 
    user            =     models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)
    post            =     models.ForeignKey(CreatePost,on_delete=models.CASCADE,blank=True,null=True,related_name="comments")
    parent          =     TreeForeignKey('self',on_delete=models.CASCADE,blank=True,null=True,related_name="children")
    slug            =     models.SlugField(unique=True)
    email           =     models.EmailField()
    content         =     models.TextField()
    publish_date    =     models.DateTimeField(auto_now_add=True)
    status          =     models.BooleanField(default=True)

    class MPTTMeta: 
        order_insertion_by = ['publish_date']
 
    def __str__(self): 
        return f'comment by {self.user} in {self.post}' 

    @property
    def get_content_type(self):    
        instance  = self 
        content_type = ContentType.objects.get_for_model(instance.__class__).model
        return content_type

    def get_absoulte_url(self):
        return reverse("postview",kwargs={"slug":self.slug})    



def create_slug(instance,new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = CreatePost.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" %(slug,qs.first().id)
        return create_slug(instance,new_slug=new_slug)
    return slug
    print(slug)
def pre_save_post_receive(sender,instance,*args,**kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)
    

pre_save.connect(pre_save_post_receive,sender=CreatePost)                         

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


