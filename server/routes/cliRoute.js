const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure storage settings for uploaded files using Multer
const storage = multer.diskStorage({
    destination: './draw-chart',
    filename: (req, file, cb) => {
        const formattedFilename = file.originalname.replaceAll(' ', '-'); // Replace all the space ' ' occurences in the file name with '-'
        cb(null, `${Date.now()}-${formattedFilename}`);
    },
});

// Define a custom filter function to accept only CSV files during file upload
const csvFileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        const error = new Error('Only CSV files are allowed'); // Create an error for other file types
        error.status = 400; // Set the HTTP status code for the error
        cb(error, false); // Reject the file
    }
};

// Create a Multer instance with the defined storage and file filter
const upload = multer({
    storage,
    fileFilter: csvFileFilter,
});

// Define a route for handling file uploads via POST request
router.post('/upload', (req, res, next) => {
    try {
        // Use upload.single middleware to handle file upload
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

// Define a route for deleting files based on their filenames
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

// Define a route for retrieving and sending the content of CSV files
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

module.exports = router; // Export the router for use in other parts of the application
