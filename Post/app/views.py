from django.shortcuts import render, redirect,reverse,get_object_or_404
from .forms import CreatePostform, CommentForm
from .models import CreatePost
from marketing.models import SubscribeModel,Comment
from marketing.forms import EmailSignupForm
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from .forms import CreateUserForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from .decorators import unauthenticated_user,allowed_user
from django.http import JsonResponse, HttpResponseRedirect
from django.views.generic import DetailView,RedirectView
from django.contrib.auth.models import Group,User


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
			user = form.save(commit=False)
			user.save()
			group = Group.objects.get(name='reader')
			user.groups.add(group)
			username = form.cleaned_data.get('username')
			messages.success(request,'Account was created for'+ ' ' + username)
			return redirect('login')

	context={'form':form}
	return render(request,'register.html',context)

def LogoutView(request):
	logout(request)
	return redirect('login')


# @login_required(login_url='login')
def Footer(request):
	form = EmailSignupForm()
	if request.method == "POST":
		email = request.POST.get("email")	
		new_signup = SubscribeModel()
		print(new_signup.email)
		new_signup.email = email
		new_signup.save()
	context ={"forms":form}
	return render(request, "footer.html",context)

def Index(request):
	images = CreatePost.objects.order_by('-publish_date')[0:9]
	title = "Home Page"
	Subscribeform = EmailSignupForm()
	if request.method == "POST":
		email = request.POST.get("email")	
		new_signup = SubscribeModel()
		print(new_signup.email)
		new_signup.email = email
		new_signup.save()
	context ={"images":images,"title":title, "Subscribeform":Subscribeform}
	return render(request, "index.html",context)

def Home(request):  
	Latest_post = CreatePost.objects.order_by('-publish_date')[0:5]
	images = CreatePost.objects.order_by('-publish_date')[0:8]
	post = CreatePost.objects.all()
	Subscribeform = EmailSignupForm()
	if request.method == "POST":
		email = request.POST.get("email")	
		new_signup = SubscribeModel()
		print(new_signup.email)
		new_signup.email = email
		new_signup.save()
		
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
 
	

	context = {"title": "Blog Page","Subscribeform":Subscribeform, "post": paginator_queryset,"page_request_var":page_request_var,"latest_post":Latest_post,"images":images}
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
	context = {"title": title, "forms": form}
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

	Subscribeform = EmailSignupForm()
	if request.method == "POST":
		email = request.POST.get("email")	
		new_signup = SubscribeModel()
		print(new_signup.email)
		new_signup.email = email
		new_signup.save()
	context = {"post":post,"images":images,"latest_post":Latest_post,"forms":form,"Subscribeform":Subscribeform}
	return render(request, "single-post.html",context)


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
			return redirect(post.get_post_absoulte_url())
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
		response = HttpResponse("You do not have permission to view this page. <a></>")
		response.status_code = 403
		return response

	if request.method =="POST":
		obj.delete()
		messages.success(request,"Deleted successfully!")
		return redirect(reverse('postview',kwargs={'slug':obj.slug}))

	context = {"object":obj}
	return render(request,"comment_delete.html", context)


def like(request):
	if request.POST.get('action') == 'post':
		result = ''
		id = int(request.POST.get('postid'))
		post = get_object_or_404(CreatePost, id=id)
		if post.likes.filter(id=request.user.id).exists():
			post.likes.remove(request.user)
			post.like_count -= 1
			result = post.like_count
			post.save()
		else:
			post.likes.add(request.user)
			post.like_count += 1
			result = post.like_count
			post.save()

		return JsonResponse({'result': result, })
		
def aboutPage(request):
	context = {"Admin": "Kamal"} 
	return render(request,"about.html", context) 


