
// indexedDB: Reforzamiento
let request=window.indexedDB.open('mi-database',1);

//Se actualiza cuando se crea o se sube la version de la DB

request.onupgradeneeded=event=>{
    console.log('Actualizacion de DB');
    let db=event.target.result; //referencia a la base de datos

    db.createObjectStore('heroes',{
        keyPath:'id'
    });
};

//Manejo de errores

request.onerror=event=>{
    console.log('DB error:',event.target.error);
};

//Insertar data

request.onsuccess=event=>{
    let db=event.target.result;

    let heroesData=[
        {id:'1111',heroe:'Spiderman',mensaje:'Aqui su amigo Spiderman'},
        {id:'2222',heroe:'Iron Man',mensaje:'Aqui su amigo Tony Stark'}
    ];

    let heroesTransaction=db.transaction('heroes','readwrite');

    heroesTransaction.onerror=event=>{
        console.log('Error guarnadndo',event.target.error);
    };

    //si se hace correctamente
    heroesTransaction.oncomplete=event=>{
        console.log('Trasaccion hecha',event);
    };

    let heroesStore=heroesTransaction.objectStore('heroes');

    for (let heroe of heroesData) {
          heroesStore.add(heroe);
    }
    heroesStore.onsuccess=event=>{
        console.log('Nuevo item agregado a la base de datos');
    };
};

