const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.status(200).send('File uploaded successfully');
// });  

const cliRoutes = require('./routes/cliRoute');
app.use('/', cliRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});