from django.shortcuts import render


def custom_login(request):
    return render(request, 'login.html')


def inicio_sesion(request):
    return render(request, 'inicio_sesion.html')


def index(request):
    context = {
        'custom_message': '¡Bienvenido a la página de inicio de sesión personalizada!',
    }
    return render(request, 'PagPrincipal.html', context)


def pag2(request):
    return render(request, 'pag2.html')


def anime_salud(request):
    return render(request, 'Anime_Salud.html')


def galeria(request):
    return render(request, 'galeria.html')


def administrador(request):
    return render(request, 'administrador.html')


def crudVIP(request):
    return render(request, 'crudVIP.html')


def Mangas(request):
    return render(request, 'Mangas.html')


def crudboss(request):
    return render(request, 'crudboss.html')


def pagprincipalvip1(request):
    return render(request, 'PagPrincipalVIP1.html')


def pagprincipalvip2(request):
    return render(request, 'PagPrincipalVIP2.html')


def anime_saludvip(request):
    return render(request, 'anime_saludvip.html')


def galeriavip(request):
    return render(request, 'galeriavip.html')


def nosotrosvip(request):
    return render(request, 'nosotrosvip.html')


def pagprincipalusuario(request):
    return render(request, 'PagPrincipalUsuario.html')


def pagprincipalusuario2(request):
    return render(request, 'PagPrincipalUsuario2.html')


def anime_saludusuario(request):
    return render(request, 'anime_saludusuario.html')


def galeriausuario(request):
    return render(request, 'galeriausuario.html')


def nosotrosuario(request):
    return render(request, 'nosotrosusuario.html')


def boss(request):
    return render(request, 'PagPrincipalBoss.html')


def boss2(request):
    return render(request, 'PagPrincipalBoss2.html')


def anime_saludboss(request):
    return render(request, 'anime_saludboss.html')


def galeriaboss(request):
    return render(request, 'galeriaboss.html')


def nosotrosboss(request):
    return render(request, 'nosotrosboss.html')


# --------------------------PAGO

def crudpago(request):
    return render(request, 'crudpago.html')


def crudusuario(request):
    return render(request, 'crudusuario.html')


''


def nosotros(request):
    return render(request, 'nosotros.html')


def admin_mangas(request):
    return render(request, 'adminMangas.html')

def prueba(request):
    return render(request, 'prueba.html')