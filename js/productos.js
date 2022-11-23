$(document).ready(function () {
    var url = '/Tecno_Shop/ConsultarProductoServlet';
    
    buscarCategoria(url + "?categoria=computadores", "computadores");
    buscarCategoria(url + "?categoria=Laptops", "Laptops");
    buscarCategoria(url + "?categoria=Smartphone", "Smartphone");
    buscarCategoria(url + "?categoria=Bocinas", "Bocinas");
    buscarCategoria(url + "?categoria=Audífonos", "Audífonos");
        
    function buscarCategoria(url, categoria) {
        $.ajax({
        contentType: 'application/json',
        type: 'GET',
        url: url,
        data: null,
        success: function (data) {

            for (var i = 0; i < data.length; i++) {
                html =  '<div class="producto">' +
                        '   <img alt="#" class="producto__imagen" src="'+ data[i].urlImagen +'" />' +
                        '   <div class="producto__contenido">' +
                        '       <h4 class="producto__titulo">'+ data[i].marca + ' ' + data[i].modelo + ' ' + data[i].nombre +'</h4>' +
                        '       <p class="producto__precio">$' + data[i].precio + '</p>' +
                        '       <button id="boton-producto" > <a href="nuevoUsuario.html?id='+ data[i].id_producto +'"  class="producto__boton"> Comprar Ahora!! </a></button> ' +
                        '   </div>' +
                        '</div>';
                $("#"+categoria).append(html);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
    }
});









