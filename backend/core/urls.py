from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
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
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
