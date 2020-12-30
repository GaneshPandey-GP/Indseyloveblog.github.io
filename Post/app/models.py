from django.db import models
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from mptt.models import MPTTModel,TreeForeignKey

class CreatePost(models.Model):
    title = models.CharField(max_length=40)
    image  = models.ImageField(upload_to='',null=True,blank=True)
    content = models.TextField()
    slug  = models.SlugField(unique=True)
    publish_date = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=100,default="Admin")
    likes = models.ManyToManyField(User, related_name="blog_post")

    def __str__(self): 
        return self.title
        
    @property
    def get_comments(self):
        return self.comments.all().filter(status=True)
class Comment(MPTTModel): 
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)
    post = models.ForeignKey(CreatePost,on_delete=models.CASCADE,blank=True,null=True,related_name="comments")
    parent = TreeForeignKey('self',on_delete=models.CASCADE,blank=True,null=True,related_name="children")
    name = models.CharField(max_length=50)
    email = models.EmailField()
    content = models.TextField()
    publish_date = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)
    class MPTTMeta: 
        order_insertion_by = ['publish_date']
 
    def __str__(self): 
        return f'comment by {self.user} in {self.post}' 



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
