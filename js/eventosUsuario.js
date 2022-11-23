$(document).ready(function () {

    var url = '/Tecno_Shop/CrearUsuarioServlet';
    var id = getUrlParameter('id');
    var valor = 0;
    consultarProducto(id);

    $("#numeroId").change(function () {
        url: '/Tecno_Shop/ConsultarUsuarioServlet?numeroIdentificacion=' + $("#numeroId").val();
        consultarUsuario($("#numeroId").val());
    });

    $("#btnGuardar").click(function () {
        //$(".invalid-feedback").show();
        url = '/Tecno_Shop/CrearUsuarioServlet';
        ajax();
    });

    $("#btnEditar").click(function () {
        $("#frmUsuario :input").prop("disabled", false);
        $("#btnEditar").prop("disabled", true);
        $("#btnComprar").prop("disabled", true);
        url = '/Tecno_Shop/ModificarUsuarioServlet';
    });
    
    $("#btnComprar").click(function() {
        guardarCompra();
    });

    function ajax() {
        $.ajax({
            contentType: 'application/json',
            type: 'POST',
            url: url,
            data: JSON.stringify({
                'id': $("#id").val(),
                'numeroIdentificacion': $("#numeroId").val(),
                'nombre': $("#nombre").val(),
                'apellido': $("#apellido").val(),
                'email': $("#email").val(),
                'telefono': $("#telefono").val(),
                'direccion': $("#direccion").val()
            }),
            success: function (data) {
                alert("La informacion se ha guardado!!");
                $("#btnComprar").prop("disabled", false);
                $("#frmUsuario :input").prop("disabled", true);
                $("#btnEditar").prop("disabled", false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Ocurrio un error al guardar");
            }
        });
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    }
    ;

    function consultarProducto(id) {
        $.ajax({
            contentType: 'application/json',
            type: 'GET',
            url: '/Tecno_Shop/ConsultarProductoServlet?id=' + id,
            data: null,
            success: function (data) {
                valor = data.precio;
                html = '<div class="producto">' +
                        '   <img alt="#" class="producto__imagen" src="' + data.urlImagen + '" />' +
                        '   <div class="producto__contenido">' +
                        '       <h4 class="producto__titulo">' + data.marca + ' ' + data.modelo + ' ' + data.nombre + '</h4>' +
                        '       <p class="producto__precio">$' + data.precio + '</p>' +
                        '   </div>' +
                        '</div>';
                $("#producto").append(html);

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    
    function consultarUsuario(numeroId) {
        $.ajax({
            contentType: 'application/json',
            type: 'GET',
            url: '/Tecno_Shop/ConsultarUsuarioServlet?numeroIdentificacion=' + $("#numeroId").val(),
            success: function (data) {
                $("#numeroId").val(data.numeroIdentificacion);
                $("#nombre").val(data.nombre);
                $("#apellido").val(data.apellido);
                $("#email").val(data.email);
                $("#telefono").val(data.telefono);
                $("#direccion").val(data.direccion);
                $("#frmUsuario :input").prop("disabled", true);
                $("#id").val(data.id);
                $("#btnEditar").prop("disabled", false);
                $("#btnComprar").prop("disabled", false);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    
    function guardarCompra() {
        $.ajax({
            contentType: 'application/json',
            type: 'POST',
            url: '/Tecno_Shop/CrearVentaServlet',
            data: JSON.stringify({
                'id_venta': 0,
                'id_producto': id,
                'valor': valor,
                'cantidad': 1,
                'id_usuario': $("#id").val()
            }),
            success: function (data) {
                if(!data.includes("stock")) {
                    alert("Tu compra fue exitosa!!");
                } else {
                    alert(data);
                }
                
                $("#btnComprar").prop("disabled", true);
                $("#frmUsuario :input").prop("disabled", true);
                $("#btnEditar").prop("disabled", true);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Ocurrio un error al guardar");
            }
        });
    }
});




