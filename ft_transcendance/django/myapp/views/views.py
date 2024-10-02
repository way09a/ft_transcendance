from django.shortcuts import render

def homepage(request, any=None):
	return render(request, 'index.html')
