from django.shortcuts import render

#from .models import Question

context = {}

def index(request):
    return render(request, 'polls/index.html', context)
