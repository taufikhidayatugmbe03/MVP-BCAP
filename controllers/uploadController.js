import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
const uploadRouter = express.Router();
import AWS from 'aws-sdk';
import multer from 'multer';
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const s3Client = new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET,
    region: 'ap-southeast-1'
});

const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: '',
    Body: null,
};

uploadRouter.post('/file', upload.single("file"), (req, res) => {
    const params = uploadParams;

    uploadParams.Key = req.file.originalname;
    uploadParams.Body = req.file.buffer;

    s3Client.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error -> " + err });
        }
        res.json({
            message: 'File uploaded successfully',
            'filename': req.file.originalname,
            'location': data.Location
        });
    });
});

export default uploadRouter