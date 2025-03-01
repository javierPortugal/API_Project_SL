import express  from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

//create the express application and assign the prot number
const app = express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//create some information
let stocks=[
    {id:1, name:'apple', symbol: 'AAPL', price: 175},
    {id:2, name:'tesla', symbol: 'TSLA', price: 175},
    {id:3, name:'Google', symbol: 'GOGL', price: 175},
    {id:4, name:'Amazon', symbol: 'AMZN', price: 175},

];

app.get('/stocks', (req, res)=>{
    res.json(stocks);
});

app.get('/stocks/:id', (req, res)=>{
    const stock=stocks.find(s=>s.id ===parseInt(req.params.id));
    if (!stock) return res.status(404).json({message:'Stock Not Found!!'});
    res.send(stock);
});


app.listen(PORT,()=>console.log(`Server is running and Up!! on PORT: ${PORT}`));




