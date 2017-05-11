from django.contrib.auth.models import User
from rest_framework import serializers

from blogdb.models import Article


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Article
        fields = ('id', 'url', 'title', 'author', 'image', 'body')


class NewArticleSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = Article
        fields = ('username', 'password', 'title', 'image', 'body')
