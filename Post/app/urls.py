from django.urls import path, include
from django.conf.urls import url
from .views import Home, Create, Update, Delete, Index, LoginPage, PostView, RegisterPage, LogoutView, comment_delete,like,aboutPage
from django.contrib.auth import views as auth_views
from marketing.views import email_list_signup

urlpatterns = [

    path("", Index, name="home"),
    path("blog/", Home, name="blog"),
    path("postview/<slug>", PostView, name="postview"),
    path("create/", Create, name="create"),
    path("update/<slug>", Update, name="update"),
    path("delete/<slug>", Delete, name="delete"),
    path('login/', LoginPage, name="login"),
    path('register/', RegisterPage, name="register"),
    path('logout/', LogoutView, name="logout"),
    path('comment_delete/<id>', comment_delete, name='comment_delete'),
    path('like/', like, name="like"),
    path('about/', aboutPage, name= "about"),
    path('subscribe/', email_list_signup, name="subscribe"),

  

]
