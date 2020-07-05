const express = require('express');
const router = express.Router();
const Tarea = require('../models/tareas');

//Pagina inicial:

// GETS:
router.get('/', async (req, res) => {
  const tareaTomarInfoBD = await Tarea.find();
  console.log(tareaTomarInfoBD);

  res.render('index.ejs', {
    // obtener tareas
    tareaTomarInfoBD,
  });
});

// POSTS:
router.post('/add', async (req, res) => {
  const tarea = new Tarea(req.body);
  await tarea.save();
  res.redirect('/');
});

//Prender boton hecho:

router.get('/hecho/:id', async (req, res) => {
  const { id } = req.params;
  //buscar id:
  const tarea = await Tarea.findById(id);
  //cambiar status:
  tarea.status = !tarea.status;
  await tarea.save();
  console.log(tarea);
  res.redirect('/');
});

// PUTS:

//GET
router.get('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id);
  res.render('editar.ejs', {
    tarea,
  });
});

// POST:

router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  Tarea.update({ _id: id }, req.body);
  res.redirect('/');
});

// DELETES:
router.get('/borrar/:id', async (req, res) => {
  const { id } = req.params;
  //Eliminar dato de la BD:
  await Tarea.remove({ _id: id });
  res.redirect('/');
});
module.exports = router;
