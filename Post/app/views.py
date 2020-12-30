from django.shortcuts import render, redirect,reverse 
from .forms import CreatePostform, CommentForm
from .models import CreatePost,Comment
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from .forms import CreateUserForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from .decorators import unauthenticated_user,allowed_user
from django.http import JsonResponse

@unauthenticated_user
def LoginPage(request):
	username = request.POST.get('username')
	password = request.POST.get('password')
	
	user = authenticate(username=username, password=password)
	if user is not None:
		login(request,user)
		return redirect('home')
	else:
		messages.info(request,'Username or Password is incorrect')	

	context={}
	return render(request,'login.html',context)


@unauthenticated_user
def RegisterPage(request):
	form = CreateUserForm()
	 
	if request.method == 'POST':
		form = CreateUserForm(request.POST)
		if form.is_valid():
			form.save()
			user = form.cleaned_data.get('username')
			messages.success(request,'Account was created for'+ ' ' + user)
			return redirect('login')

	context={'form':form}
	return render(request,'register.html',context)

def LogoutView(request):
	logout(request)
	return redirect('login')


# @login_required(login_url='login')

def Index(request):
    images = CreatePost.objects.order_by('-publish_date')[0:9]
    title = "Home Page"
    context ={"images":images,"title":title}
    return render(request, "index.html",context)

def Home(request):  
    Latest_post = CreatePost.objects.order_by('-publish_date')[0:5]
    images = CreatePost.objects.order_by('-publish_date')[0:8]
    post = CreatePost.objects.all()
   
    query = request.GET.get('q')
    if query:
        post = post.filter(Q(title__icontains=query) |
                           Q(content__icontains=query)).distinct()
    paginator = Paginator(post, 2)
    page_request_var = 'page'
    page = request.GET.get(page_request_var)
    try:
        paginator_queryset = paginator.page(page)

    except PageNotAnInteger:
        paginator_queryset = paginator.page(1)

    except EmptyPage:
        paginator_queryset = paginator.page(paginator.num_pages)
 
   
    context = {"title": "Blog Page", "post": paginator_queryset,"page_request_var":page_request_var,"latest_post":Latest_post,"images":images}
    return render(request, "blog.html", context)




@login_required(login_url='login')
@allowed_user(allowed_roles=['admin'])
def Create(request):
    title = "Home Page"
    form = CreatePostform()
    if request.method == "POST":
        form = CreatePostform(request.POST,request.FILES or None)
        if form.is_valid():
            form.save()
            return redirect("/")
    context = {"title": title, "form": form}
    return render(request, "create.html", context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin' , 'reader'])
def PostView(request,slug):
   
    post = CreatePost.objects.get(slug=slug)
    form = CommentForm()
    if request.method == "POST":
        form = CommentForm(request.POST or None)
        if form.is_valid:
                form.instance.user = request.user
                form.instance.post = post
                form.save()
                return redirect(reverse('postview',kwargs={'slug':post.slug}))
    images = CreatePost.objects.order_by('-publish_date')[0:8]
    Latest_post = CreatePost.objects.order_by('-publish_date')[0:5]
    comment_form = CommentForm()
    context = {"post":post,"images":images,"latest_post":Latest_post,"form":form,'comment_form':comment_form}
    return render(request, "single-post.html",context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin']) 
def addcomment(request): 
    if request.method == "POST":
        post = CreatePost.objects.get(slug="test-article")
        form = CommentForm(request.POST or None)
        print(form)
        if form.is_valid:
                form.instance.user = request.user
                form.instance.post = post
                result = form.cleaned_data.get('content')
                user = request.user.username
                form.save()
               
                return JsonResponse({'result':result, 'user':user})
        

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin']) 
def Update(request, slug):
    title = "Update Post"
    post = CreatePost.objects.get(slug=slug)
    form = CreatePostform(request.FILES or None ,instance=post )
    if request.method == "POST":
        form = CreatePostform(request.POST,request.FILES  or None,instance=post)
        if form.is_valid():
            form.save()
            return redirect("/")
    context = {"title": title, "form": form}
    return render(request, "update.html", context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin'])
def Delete(request, slug):
    title = "Delete pOst"
    post = CreatePost.objects.get(slug=slug)
    post.delete()
    return redirect("/")
    return render(request, "delete.html")

@login_required(login_url="login/")
def comment_delete(request,id):
    try:
        obj = Comment.objects.get(id=id)
    except:
        raise Http404    

    if request.user != obj.user:
        response = HttpResponse("You do not have permission to view this page.")
        response.status_code = 403
        return response

    if request.method =="POST":
        obj.delete()
        messages.success(request,"Deleted successfully!")
        return redirect("/")

    context = {"object":obj}
    return render(request,"comment_delete.html", context)     