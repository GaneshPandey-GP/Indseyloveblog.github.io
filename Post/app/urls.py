from django.urls import path,include
from .views import Home,Create,Update,Delete,Index,LoginPage,PostView,RegisterPage,LogoutView,addcomment,comment_delete


urlpatterns = [
   
    path("",Index,name="home"),
    path("blog/",Home, name="blog"),
    path("postview/<slug>",PostView,name="postview"),
    path("create/",Create,name="create"),
    path("update/<slug>",Update,name="update"),
    path("delete/<slug>",Delete,name="delete"),
    path('login/', LoginPage, name="login"),
    path('register/', RegisterPage, name="register"),
    path('logout/', LogoutView, name="logout"),
    path('addcomment', addcomment, name='addcomment'),
    path('comment_delete/<id>',comment_delete, name='comment_delete'),
]
