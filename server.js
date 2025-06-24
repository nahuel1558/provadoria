const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const DEEPAR_API_KEY = process.env.DEEPAR_API_KEY; // Usa la variable de entorno
app.use(cors());
app.use(express.static('public')); 

app.post('/api/try-on', upload.single('photo'), async (req, res) => {
  try {
    const response = await axios.post('https://api.deepar.ai/try-on', {
      image: req.file.path,
      garmentId: 'remera-1', 
    }, {
      headers: { Authorization: 'Bearer ${DEEPAR_API_KEY}' },
    });

    res.json({ success: true, imageUrl: response.data.url });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al procesar la imagen' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});