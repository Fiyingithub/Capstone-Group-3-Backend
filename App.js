import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Welcome to the Tech Crush Backend Group 3!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})