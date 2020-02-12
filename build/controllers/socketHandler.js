socket.on('productos precio', function(msg,form){
    funciones.NotificacionPersistent(msg,"Cambio Precios");
});

socket.on('productos bloqueado', function(msg,form){
    funciones.NotificacionPersistent(msg,"Productos Bloqueado");
});

socket.on('ordenes escribiendo', function(msg,form){
    funciones.NotificacionPersistent(msg,"Nueva Orden generada");
});

