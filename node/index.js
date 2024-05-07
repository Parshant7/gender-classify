const express = require("express");
const multer = require('multer');
const spawn = require("child_process").spawn;
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send("This is home page.");
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

app.post("/get-gender", upload.single('file'), async (req, res) => {
    console.log("this is file ",req.file);
    const fileData = req.file.buffer.toString('base64');

    const response = await axios.post('http://127.0.0.1:5000/get-gender', {
        data: fileData
    }, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
    
    console.log("response => ",response.data);
    res.json(response.data);
});

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

