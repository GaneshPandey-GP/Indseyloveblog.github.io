from django.db import models
from django.utils.text import slugify
from django.db.models.signals import pre_save
# Create your models here.


class CreatePost(models.Model):
    title = models.CharField(max_length=40)
    image  = models.ImageField(upload_to='',null=True,blank=True)
    content = models.TextField()
    slug  = models.SlugField(unique=True)
    publish_date = models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return self.title

# class Comment(models.Model): 
#     post = models.ForeignKey(CreatePost,on_delete=models.CASCADE,blank=True,null=True)
#     Name = models.



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

def pre_save_post_receive(sender,instance,*args,**kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)
    

pre_save.connect(pre_save_post_receive,sender=CreatePost)                         
