const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const con  = require('./Config/dbConnection');
const userRoutes = require('./Routers/userRoute');
const depRoutes = require('./Routers/departmentRoute');
const locRoutes = require('./Routers/locationRoute');
const eqpCatRoutes = require('./Routers/eqpCatRoute');
const settingsRoutes = require('./Routers/settingsRoute');
const meterRoutes = require('./Routers/meterRoutes');
const eqpRoutes = require('./Routers/equipmentRoute');
const jobRoutes = require('./Routers/jobRoutes');
const path = require('path');
const fs = require('fs');

const PORT  = process.env.PORT;
con.connect((err)=>{
    if(err) throw err;
    console.log("Database connection successful!");
})
app.use(cors())
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/departments',depRoutes);
app.use('/api/location',locRoutes);
app.use('/api/eqpcat',eqpCatRoutes);
app.use('/api/settings',settingsRoutes);
app.use('/api/meter',meterRoutes);
app.use('/api/equipment',eqpRoutes);
app.get('/',(req,res)=>{
    res.send('hello!')
})
app.get('/add-job',(req,res)=>{
    res.sendFile(__dirname+'/addjob.html');
})
app.get('/add-equipment',(req,res)=>{
    res.sendFile(__dirname+'/addEqp.html');
})
app.get('/api/user-image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'uploads/users', imageName);
  
    // Read the image file
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        //console.error('Error reading image file:', err);
        res.status(200).send('');
        return null;
      }
  
      // Convert binary data to base64
      const base64Image = Buffer.from(data).toString('base64');
  
      // Send the base64-encoded image in the response
      res.send(`data:image/jpeg;base64,${base64Image}`);
    });
  });
  

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}...`);
})