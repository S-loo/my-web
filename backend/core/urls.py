from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "Silas Portfolio API is running",
        "endpoints": {
            "admin": "/admin/",
            "projects": "/api/projects/",
            "blog": "/api/blog/",
            "marketplace": "/api/marketplace/",
            "contact": "/api/contact/",
            "analytics": "/api/analytics/dashboard/",
        }
    })

urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/projects/', include('portfolio.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/marketplace/', include('marketplace.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/analytics/', include('analytics.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Production serving of media files (fallback for Render)
if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
        re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    ]
