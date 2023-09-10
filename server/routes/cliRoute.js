const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './draw-chart',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const csvFileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        const error = new Error('Only CSV files are allowed');
        error.status = 400;
        cb(error, false);
    }
};

const upload = multer({
    storage,
    fileFilter: csvFileFilter,
});

router.post('/upload', (req, res, next) => {
    try {
        upload.single('file')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Multer Error: ' + err.message });
            } else if (err && err.status === 400) {
                return res.status(400).json({ message: err.message });
            }
            res.status(200).send('File uploaded successfully');
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/delete/:fileName', (req, res) => {
    try {
        const { fileName } = req.params;
        const filePath = path.join(__dirname, '..', 'draw-chart', fileName);

        if (!fs.existsSync(filePath)) {
            res.status(404).send(`File "${fileName}" not found.`);
            return;
        }

        fs.unlinkSync(filePath);
        res.status(200).send(`File "${fileName}" deleted successfully.`);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/draw/:fileName', (req, res) => {
    try {
        const { fileName } = req.params;
        const filePath = path.join(__dirname, '..', 'draw-chart', fileName);
        if (!fs.existsSync(filePath)) {
            res.status(404).send(`File "${fileName}" not found.`);
            return;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        res.status(200).send(fileContent);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
