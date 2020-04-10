
// Ciclo de vida del SW
self.addEventListener('install',event=>{
    //Descargar assets
    //Creamos un cache
    console.log("SW:Instalando el sevice worker");

    const instalacion=new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("SW:Instalaciones terminadas");
        }, 10);
    
        self.skipWaiting();
        resolve();
    });
    
    event.waitUntil(instalacion);
});

//Cuando el Service Worker toma el control de la aplicacion
self.addEventListener('activate',event=>{
    //Borrar cache vieja
    console.log("SW:Activo y listo para controlar la app");
});

//Manejo de peticiones http
self.addEventListener('fetch',event=>{
    //Aplicar estrategias del cache
    /*
    console.log("SW:",event.request.url);
    if (event.request.url.includes('https://reqres.in/')) {
        const resp=new Response(`{ok:false,mensaje:'jajajaja'}`);

        event.respondWith(resp);
    }*/
});

//SYNC cuando Recuperamos la conexion a internet
self.addEventListener('sync',event=>{
    console.log('Tenemos conexion');
    console.log(event);
    console.log(event.tag);
});


//Push:Manejar las push notifications
self.addEventListener('push',event=>{
    console.log('Notificacion recibida');
});