from django.urls import path,include
from .views import Home,Create,Update,Delete,Index,PostView
urlpatterns = [
   
    path("",Index,name="home"),
    path("blog/",Home, name="blog"),
    path("postview/<slug>",PostView,name="postview"),
    path("create/",Create,name="create"),
    path("update/<slug>",Update,name="update"),
    path("delete/<slug>",Delete,name="delete")
    
]
