from django.urls import path
from .views import ProjectListView, ProjectDetailView, ProjectBySlugView

urlpatterns = [
    path('', ProjectListView.as_view(), name='project-list'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('u/<slug:slug>/', ProjectBySlugView.as_view(), name='project-by-slug'),
]
