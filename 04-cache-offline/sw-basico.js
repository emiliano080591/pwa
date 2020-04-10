self.addEventListener('fetch',event=>{

    /*
    const offLineResponse=new Response(`
        Bienvenido a mi pagina web

        Disculpa,pero para usarla,necesitas internet
    `);
   
    const offLineResponse=new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Mi PWA</title>
        </head>
        <body class="container p-3">
            <h1>OFFLINE MODE</h1>
        </body>
        </html>
    `,{
        headers:{
            'Content-Type':'text/html'
        }
    });
     */
    const offLineResponse=fetch('pages/offLine.html');
    
    const resp=fetch(event.request)
                    .catch(()=>offLineResponse);
    
    event.respondWith(resp);
});


