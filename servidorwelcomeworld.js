//Servidor.
const express = require('express')
const app = express()
const fs = require('fs').promises
app.listen(3000, console.log("SERVIDOR ARRIBA"))

//Usar carpeta pública.
app.use(express.static("public"));

//Ruta por defeceto.
app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html")
});

//Crear.
//Constante
const moment = require('moment'); 
app.get("/crear", (req, res) => {
//Crear 2 variables con el nombre y contenido recibidos por Query Strings.
const { nombre, contenido } = req.query
  // Obtener la fecha actual en el formato deseado
  const fechaActual = moment().format("DD/MM/YYYY");
  // Agregar la fecha al contenido del archivo
  const contenidoFecha = `${fechaActual} ${contenido}`;
// Utiliza File System para crear un archivo con el nombre y contenido recibidos.
fs.writeFile(nombre, contenidoFecha, () => {
    res.send('Archivo creado con éxito!')
    })
})

//Leer.
app.get("/leer", async (req, res) => {
 const { nombre } = req.query
 try {
 const data = await fs.readFile(nombre)
 res.send(data)
 } catch (error) {
 res.status(500).send("Algo salió mal...")
 }
});

// Renombrar.
app.get("/renombrar", (req, res) => {
    const { nombreActual, nuevoNombre } = req.query;
    fs.rename(nombreActual, nuevoNombre, (err) => {
        if (err) {
            return res.status(500).send(`Error al renombrar el archivo ${nombreActual}`);
        }
        res.send(`Archivo ${nombreActual} renombrado a ${nuevoNombre} con éxito`);
    });
});


//Eliminar.
app.get("/eliminar", async (req, res) => {
 const { nombre } = req.query
 try {
 await fs.unlink(nombre)
 res.send(`Archivo ${nombre} eliminado con éxito`)
 } catch (error) {
 res.status(500).send("Algo salió mal...")
 }
});