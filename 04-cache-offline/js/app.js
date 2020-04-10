

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}
/*
if (window.caches) {
    //crea las caches
    caches.open('prueba-1');
    caches.open('prueba-2');
    //comprueba si existe una cache
    //caches.has('prueba-2').then(console.log);
    
    //borra un cache
    //caches.delete('prueba-1').then(console.log);;

    caches.open('cache-v1.1').then(cache=>{
        //cache.add('/index.html');

        cache.addAll([
            '/index.html',
            '/css/style.css',
            'img/main.jpg'
        ]).then(()=>{
            //borra un archivo del cache
            //cache.delete('css/style.css');

            //reemplaza un archivo del cache
            cache.put('index.html',new Response('Hola mundo'));
        });
        
        /*
        cache.match('/index.html').then(res=>{
            res.text().then(console.log);
        });

    });

    caches.keys().then(keys=>{
        console.log(keys);
    });
}*/