// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();


const mensajes=[
  {
    _id:'111',
    user:'spiderman',
    mensaje:'Hola mundo'
  }
];




// Get mensajes
router.get('/', function (req, res) {
  //res.json('Obteniendo mensajes');
  res.json(mensajes);
});

//Post de mensajes
router.post('/', function (req, res) {
  const mensaje={
    mensaje:req.body.mensaje,
    user:req.body.user
  };

  mensajes.push(mensaje);

  console.log(mensaje);
  res.json({
    ok:true,
    mensaje: mensaje
  });
});


module.exports = router;