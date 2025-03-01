import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app=express();
const PORT= process.env.PORT || 5000;
const FINNHUB_API_KEY=process.env.FINNHUB_API_KEY;

app.use(cors());
app.use(express.json());

const FINNHUB_BASE_URL="https://finnhub.io/api/v1";



app.get('/stocks/all',async(req,res)=>{
    const exchange=req.query.exchange || 'US' 

    try {
        const response=await axios.get(`${FINNHUB_BASE_URL}/stock/symbol`,{
            params:{ exchange, token:FINNHUB_API_KEY }, 
            headers:{'X-Finnhub-Token':FINNHUB_API_KEY}
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message:'Failed to fetch stocks list from Finnhub',details:error.response?.data || error.message});
    }
})


app.get('/stocks/:symbol',async(req,res)=>{
    const {symbol}=req.params;

    try {
        const response=await axios.get(`${FINNHUB_BASE_URL}/quote`,{
            params:{ symbol, token:FINNHUB_API_KEY }, 
            headers:{'X-Finnhub-Token':FINNHUB_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message:'Failed to fetch stock by symbol',details:error.response?.data || error.message});

    }
})

app.listen(PORT,()=>{
    console.log(`Server is running and Up! on PORT: ${PORT}`)
});




