const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(fileUpload());

app.post('/api/upload/image', (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const imageFile = req.files.image;
  const uploadPath = path.join(__dirname, "/public", 'images', imageFile.name); 

  imageFile.mv(uploadPath, (err) => {
    if (err) {
      console.error('Error moving file:', err);
      return res.status(500).json({ error: 'Failed to upload the image' });
    }

    res.json({ message: 'Image uploaded successfully', imagePath: `/images/${imageFile.name}` });
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
