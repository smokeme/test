from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, mixins
from rest_framework.response import Response

from blogdb.models import Article
from blogdb.serializers import ArticleSerializer, NewArticleSerializer


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class NewArticleViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = NewArticleSerializer

    @csrf_exempt
    def create(self, request):
        serializer = NewArticleSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            title = serializer.data.get('title')
            body = serializer.data.get('body')
            image = serializer.data.get('image')
            user = authenticate(username=username, password=password)
            if user is None:
                return Response({'error': 'unauthorized'}, status=404)
            b = Article(author=user, body=body, title=title, image=image)
            b.save()
            return Response(ArticleSerializer(instance=b, context={'request': request}).data)
        else:
            return Response({'error': 'invalid data'}, status=400)
