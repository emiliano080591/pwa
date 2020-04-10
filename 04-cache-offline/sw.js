//const CACHE_NAME='cache-1';

const CACHE_STATIC='static-v2';
const CACHE_DYNAMIC='dynamic-v1';
const CACHE_INMUTABLE='inmutable-v1';
const CACHE_DYNAMIC_LIMIT=50;

function limpiarCache(cacheName,numeroItems) {
    caches.open(cacheName)
        .then(cache=>{
            return cache.keys()
                .then(keys=>{
                    if (keys.length>numeroItems) {
                        cache.delete(keys[0]).then(limpiarCache(cacheName,numeroItems));
                    }
                });
        });
}

self.addEventListener('install',e=>{
    const cacheProm=caches.open(CACHE_STATIC).then(cache=>{
        return cache.addAll([
            '/',
            '/index.html',
            'css/style.css',
            '/img/main.jpg',
            '/js/app.js'
        ]);
    });//cacheProm

    const cacheInmutable=caches.open(CACHE_INMUTABLE).then(cache=>{
        return cache.addAll([
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ]);
    });//cacheInmutable

    e.waitUntil(Promise.all([cacheProm,cacheInmutable]));
});

self.addEventListener('fetch',e=>{
    //1-Cache only->Cuando queremos que ya no se salga a
    //la web y todo se subministre desde el cache storage
    //e.respondWith(caches.match(e.request));

    //2-Cache with network fallback->Si no esta en el cache
    //buscalo en la web
    /*
    const respuesta=caches.match(e.request).then(resp=>{
        if (resp) return resp;

        //No existe el archivo tengo que ir a la web
        console.log('No existe: ',e.request.url);
        return fetch(e.request).then(newResp=>{
            caches.open(CACHE_DYNAMIC).then(cache=>{
                cache.put(e.request,newResp);
                limpiarCache(CACHE_DYNAMIC,3);
            });
            return newResp.clone();

        });
    });

    e.respondWith(respuesta);
    */

    //3.-Network with cache fallback->Primero se llama a la web
    //y despues a la cache
    /*
    const respuesta=fetch(e.request).then(res=>{

                if(!res) return caches.match(e.request);

                caches.open(CACHE_DYNAMIC)
                    .then(cache=>{
                        cache.put(e.request,res);
                        limpiarCache(CACHE_DYNAMIC,CACHE_DYNAMIC_LIMIT);
                    });
                return res.clone();
            }).catch(err=>{
                return caches.match(e.request);
            });
    e.respondWith(respuesta);
    */

    //4-Cache with network update->
    //Cuando el rendimiento es critico
    if (e.request.url.includes('bootstrap')) {
         return e.respondWith(caches.match(e.request));
    }
    const respuesta=caches.open(CACHE_STATIC).then(cache=>{
        fetch(e.request).then(newRes=>{
            cache.put(e.request,newRes);
        });

        return cache.match(e.request);
    });

    e.respondWith(respuesta);
})