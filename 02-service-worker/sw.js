self.addEventListener('fetch',event=>{
    /*
    if (event.request.url.includes('.jpg')) {
        console.log(event.request.url);

        let fotoReq=fetch(event.request.url);
        event.respondWith(fotoReq);
    }*/

    //intercepta style.css y regresa otro estilo
    /*
    if (event.request.url.includes('style.css')) {
        let respuesta=new Response(`
            body{
                background-color:red !important;
                color:pink;
            }
        `,{
            headers:{
                'Content-Type':'text/css'
            }
        });

        event.respondWith(respuesta);
    }*/

    //intercepta la imagen principal y la sustituye
    /*
    if (event.request.url.includes('main.jpg')) {
        event.respondWith(fetch('img/main-patas-arriba.jpg'));
    }*/

    //Manejo de errores

    const resp= fetch(event.request)
                    .then(resp=>{
                        /*if (resp.ok) {
                            return resp;
                        } else {
                            return fetch('img/main.jpg');
                        }*/
                        return resp.ok ? resp : fetch('img/main.jpg');
                    });
    event.respondWith(resp);
});