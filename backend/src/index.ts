import express from 'express'
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({success: true, message :"heelo world"});
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});