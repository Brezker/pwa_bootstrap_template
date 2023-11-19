// Config sw

alert('Hola')
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('sw.js')
    .then(function(registration){
        // el sw se ejecuto correctamente
        console.log('Service worker registrado con exito', registration);
    })
    .catch(function(error){
        console.error('Error al registrar el sw: ', error);
    });
} else {
    console.error('Error, no soporta el SW: ');
}