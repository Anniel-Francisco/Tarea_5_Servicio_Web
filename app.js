const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/contactos", async (req, res) => {
  try {
    const response = await axios.get("http://www.raydelto.org/agenda.php");
    const contactos = response.data;
    res.send(contactos);
  } catch (error) {
    res.status(500).send({ error: "No se pudieron obtener los contactos" });
  }
});

app.post("/contactos", async (req, res) => {
  try {
    const nuevoContacto = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
    };

    const response = await axios.post(
      "http://www.raydelto.org/agenda.php",
      nuevoContacto
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "No se pudo almacenar el contacto" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
