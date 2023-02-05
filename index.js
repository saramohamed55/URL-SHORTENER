const express=require('express');
const app=express();
const connectDB=require('./config/db');
//connect database
connectDB();
app.use(express.json({extented:false}));
//Define routes
app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'))

const PORT=5000;
app.listen(PORT,()=>console.log(`Server running on port${PORT}`));