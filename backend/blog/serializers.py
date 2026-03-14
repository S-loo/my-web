from rest_framework import serializers
from .models import BlogPost, Tag
from accounts.serializers import UserSerializer

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')
        read_only_fields = ('id', 'slug')

class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ('slug', 'created_at', 'updated_at', 'author')
