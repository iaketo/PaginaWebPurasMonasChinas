function cargarListaUsuarios() {
    $.ajax({
        url: "http://localhost:9010/web/cargar-usuarios/", // URL de la vista que devuelve los usuarios
        method: 'GET',
        success: function (response) {
            var usuarios = response.usuarios;
            var listaUsuarios = '';
            usuarios.forEach(function (usuario) {
                listaUsuarios += '<tr>';
                listaUsuarios += '<td>' + usuario.id + '</td>';
                listaUsuarios += '<td>' + usuario.usuario + '</td>';
                listaUsuarios += '<td>' + usuario.correo + '</td>';
                listaUsuarios += '<td>' + usuario.contraseña + '</td>';
                listaUsuarios += '<td><a href="#" class="btn-actualizar" data-id="' + usuario.id + '">Actualizar</a></td>';
                listaUsuarios += '<td><a href="#" class="btn-eliminar" data-id="' + usuario.id + '">Eliminar</a></td>';
                listaUsuarios += '</tr>';
            });
            $('#tbodyUsuarios').html(listaUsuarios);
            console.log("todo salio bien")
        },
        error: function (xhr, errmsg, err) {
            console.log(xhr.status + ":aqui es el error " + xhr.responseText);
            // Manejo de errores si la solicitud falla
        }
    });
}

// Llama a la función para cargar usuarios cuando la página se cargue
cargarListaUsuarios();

$(document).ready(function () {
    // Evento clic para botón "Actualizar"
    $('#tbodyUsuarios').on('click', '.btn-actualizar', function (e) {
        e.preventDefault();
        var userId = $(this).data('id');
        var newUsername = $('#newUsername').val();
        var newEmail = $('#newEmail').val();
        var newPassword = $('#newPassword').val();

        // Asignar los datos del usuario al modal
        $('#modalActualizarUsuario').find('#username').val(newUsername);
        $('#modalActualizarUsuario').find('#email').val(newEmail);
        $('#modalActualizarUsuario').find('#password').val(newPassword);

        // Asignar el ID del usuario al campo de entrada oculto en el modal
        $('#modalActualizarUsuario').find('#user_id').val(userId);

        // Abre el modal
        $('#modalActualizarUsuario').modal('show');
    });



    // Evento clic para botón "Actualizar" en el modal
    $(document).ready(function () {
        var userIdToUpdate; // Variable global para almacenar el ID del usuario seleccionado

        // Evento clic para botón "Actualizar"
        $('#tbodyUsuarios').on('click', '.btn-actualizar', function (e) {
            e.preventDefault();
            userIdToUpdate = $(this).data('id'); // Obtener el ID del usuario seleccionado

            // Abre el modal
            $('#modalActualizarUsuarioBoss').modal('show');
        });

        // Evento clic para botón "Actualizar" en el modal
        $('#btnActualizarUsuarioBoss').click(function () {
            // Obtener los datos del modal
            var newUsername = $('#newUsernameboss').val();
            var newEmail = $('#newEmailboss').val();
            var newPassword = $('#newPasswordboss').val();

            $.ajax({
                url: 'http://localhost:9010/web/actualizar-usuario/',
                method: 'POST',
                data: {
                    userId: userIdToUpdate, // Usar el ID del usuario almacenado globalmente
                    newUsername: newUsername,
                    newEmail: newEmail,
                    newPassword: newPassword
                },
                success: function (response) {
                    if (response.status === 'success') {
                        console.log({
                            icon: 'success',
                            title: '¡Usuario actualizado exitosamente!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('#modalActualizarUsuarioBoss').modal('hide'); // Ocultar el modal después de la actualización
                        cargarListaUsuarios(); // Recargar la lista de usuarios después de la actualización
                    } else {
                        console.log({
                            icon: 'error',
                            title: 'Error al actualizar usuario',
                            text: response.message
                        });
                    }
                },
                error: function (xhr, errmsg, err) {
                    console.log(xhr.status + ": Error al actualizar usuario");
                }
            });
        });
    });




    // Evento clic para botón "Eliminar"
    $('#tbodyUsuarios').on('click', '.btn-eliminar', function (e) {
        e.preventDefault();
        var userId = $(this).data('id');
        if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            $.ajax({
                url: 'http://localhost:9010/web/eliminar-usuario/',
                method: 'POST',
                data: { userId: userId },
                success: function (response) {
                    if (response.status === 'success') {
                        console.log({
                            icon: 'success',
                            title: '¡Usuario eliminado exitosamente!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        cargarListaUsuarios(); // Recargar la lista de usuarios después de la eliminación
                    } else {
                        console.log({
                            icon: 'error',
                            title: 'Error al eliminar usuario',
                            text: response.message
                        });
                    }
                },
                error: function (xhr, errmsg, err) {
                    console.log(xhr.status + ": Error al eliminar usuario");
                }
            });
        }
    });

    // Llama a la función para cargar usuarios cuando la página se cargue por primera vez
    cargarListaUsuarios();
});
