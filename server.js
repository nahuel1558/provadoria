const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static('public')); 

app.post('/api/try-on', upload.single('photo'), async (req, res) => {
  try {
    const response = await axios.post('https://api.deepar.ai/try-on', {
      image: req.file.path,
      garmentId: 'remera-1', 
    }, {
      headers: { Authorization: 'Bearer TU_API_KEY_DEEPAR' },
    });

    res.json({ success: true, imageUrl: response.data.url });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al procesar la imagen' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});