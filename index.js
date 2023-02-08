import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/router.js'
dotenv.config();

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json('application/json'));
app.use(cors('http://localhost:3000'))
app.use(router);


app.listen( Number(process.env.PORT), () => {
    console.log(`Server Running on PORT ${process.env.PORT}`)
})
