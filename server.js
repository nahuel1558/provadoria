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
      headers: { Authorization: 'Bearer 6c4eb607818deb4a74f6a549a0de87321012db8a6c7ad9621c5cbed5f1709fe33b69026a70af9c31' },
    });

    res.json({ success: true, imageUrl: response.data.url });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al procesar la imagen' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});