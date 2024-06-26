"""
URL configuration for frontend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import  path
from django.views.generic.base import RedirectView
from django.shortcuts import redirect
from web import views
from web.views import custom_login, inicio_sesion, index, pag2, anime_salud, galeria, administrador, crudVIP, Mangas, crudboss
from web.views import prueba,custom_login, crudpago, inicio_sesion, pag2, anime_salud, galeria, administrador, crudusuario, pagprincipalusuario, pagprincipalusuario2, anime_saludusuario, galeriausuario, pagprincipalvip1, pagprincipalvip2, anime_saludvip, galeriavip, nosotrosvip, nosotros, nosotrosuario, boss, boss2, crudboss, anime_saludboss, galeriaboss, nosotrosboss, admin_mangas


urlpatterns = [

    path('admin/', admin.site.urls),
    path('web/login/', custom_login, name='custom_login'),
    path('web/inicio_sesion/', inicio_sesion, name='inicio_sesion'),
    path('web/listado_admin/', admin.site.urls),
    path('web/PagPrincipal/', index, name='pagina_principal'),
    path('web/nosotrosadmin/', nosotros, name='nosotros'),
    path('web/pagprincipalusuario/', pagprincipalusuario,
         name='pagprincipalusuario'),
    path('web/crudusuario/', crudusuario, name='crudusuario'),
    path('web/pagprincipalusuario2/', pagprincipalusuario2,
         name='pagprincipalusuario2'),
    path('web/anime-saludusuario/', anime_saludusuario, name='anime_saludusuario'),
    path('web/galeriausuario/', galeriausuario, name='galeriausuario'),
    path('web/nosotrosusuario/', nosotrosuario, name='nosotrosusuario'),
    path('web/pagina2/', pag2, name='pag2'),
    path('web/anime-salud/', anime_salud, name='anime_salud'),
    path('web/galeria/', galeria, name='galeria'),
    path('web/administracion/', administrador, name='administracion'),
    path('web/pagprincipalvip1/', pagprincipalvip1, name='pagprincipalvip1'),
    path('web/pagprincipalvip2/', pagprincipalvip2, name='pagprincipalvip2'),
    path('web/anime-saludvip/', anime_saludvip, name='anime_saludvip'),
    path('web/galeriavip/', galeriavip, name='galeriavip'),
    path('web/nosotrosvip/', nosotrosvip, name='nosotrosvip'),
    path('web/crudVIP/', crudVIP, name='crudVIP'),
    path('web/Mangas/', Mangas, name='Mangas'),
    path('web/pagprincipalboss/', boss, name='pagprincipalboss'),
    path('web/crudboss/', crudboss, name='crudboss'),
    path('web/anime-saludboss/', anime_saludboss, name='anime_saludboss'),
    path('web/galeriaboss/', galeriaboss, name='galeriaboss'),
    path('web/nosotrosboss/', nosotrosboss, name='nosotrosboss'),
    path('web/pagprincipalboss2/', boss2, name='boss2'),
    path('web/crudpago/', crudpago, name='crudpago'),
    path('web/adminmangas/', admin_mangas,  name='adminMangas'),
    path('web/prueba/', prueba,  name='prueba')



]
