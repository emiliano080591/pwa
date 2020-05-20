const db=new PouchDB('mensajes');

//Utilidades para guardar en el indexDB
function guardarMensaje(mensaje) {
    mensaje._id=new Date().toISOString();
    return db.put(mensaje).then(()=>{
        self.registration.sync.register('nuevo-post');

        const newRes={ok:true,offline:true};
        return new Response(JSON.stringify(newRes));
        //console.log('Mensaje guardado para posterior posteo');
    });
}

function postearMensajes() {
    const posteos=[];
    
    return db.allDocs({include_docs:true}).then(docs=>{
        docs.rows.forEach(row => {
            const doc=row.doc;

            const fetchProm=fetch('api',{
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body: JSON.stringify(doc)
                            }).then(res=>{
                                return db.remove(doc);
                            });
            posteos.push(fetchProm);
        });//fin de forEach
        return Promise.all(posteos);
    });
}