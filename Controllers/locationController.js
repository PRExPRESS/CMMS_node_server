const Location = require('../Models/Location');
const asyncHandler = require('express-async-handler');
const csv = require('csv-parser');
const fs = require('fs');
const util = require('util');



//create locations
const create = asyncHandler(async(req,res)=>{
    
    const {location_type,room,floor_no,description}= req.body;
    const locVal = {location_type,room,floor_no,description};

    try {
        const response = await Location.create(locVal);
        if(response.affectedRows ==1)
            res.status(201).json({message:"New record insert successful"});
    } catch (error) {
        res.status(500).json({error:"Internal server error!"});
    }
});

// bulk upload
const bulkCreate =asyncHandler(async(req,res)=>{
    
    const unlink = util.promisify(fs.unlink);
    
    try {
        if(!req.file){
            return res.status(404).json({error:"File is missing!"});
        }
        const csvData = 'uploads/temp/' + req.file.filename;
        const results = [];

        // Using csv-parser
        const parser = csv({ headers: false }); // Set headers: true to use the first row as headers
        const readable = fs.createReadStream(csvData);
        readable.pipe(parser);

        parser.on('data', (data) => {
            
            results.push(data);
        });

        parser.on('end',async () => {
        // Process the results array containing parsed data with headers

        await unlink(csvData);
        

        // fetch array and save to db
        let errLog = [];

        for (const [index, result] of results.entries()) {
            if (index !== 0) {
                const locVal = {
                location_type: result[0],
                room: result[1],
                floor_no: result[2],
                description: result[3],
                };

                try {
                const row = await Location.isExits(locVal);

                if (row > 0) {
                    
                    errLog.push({ error: 'record exists' });
                } else {
                    console.log("record does not exist");
                    await Location.create(locVal);
                }
                } catch (error) {
                    console.error('Error processing record:', error);
                    errLog.push({ error: 'error processing record' });
                }
            }
            }

            if (errLog.length > 0) {
            
            res.status(201).json({ error: "Records already exist or other errors occurred." });
            } else {
            
                res.json({ message: 'All records uploaded successfully!' });
            }
        })



    } catch (error) {
        res.status(500).json({error:"Internal server error"})
        console.log(error)
    }

});

//get all locations
const getAllLoc = asyncHandler(async(req,res)=>{
   
    try {
        const response = await Location.getAllLoc();
        if(response.length >0){
            res.status(200).json(response);
        }else{
            res.status(204).json({message:"No records found!"});
        }
    } catch (error) {
        res.status(500).json({error:"Internal server error!"});
    }
});

//get location
const getLoc = asyncHandler(async(req,res)=>{
   const id = req.params.id;
    try {
        const response = await Location.getLoc(id);
        if(response.length >0){
            res.status(200).json(response);
        }else{
            res.status(404).json({message:"No record found!"});
        }
    } catch (error) {
        res.status(500).json({error:"Internal server error!"});
    }
});

//get location by room
const getLocByRoom = asyncHandler(async(req,res)=>{
    const room = req.params.room;
     try {
         const response = await Location.getLocByRoom(room);
         
             res.status(200).json(response);
         
     } catch (error) {
         res.status(500).json({error:"Internal server error!"});
     }
 })

//update location
const update = asyncHandler(async (req,res)=>{
    const locId = req.params.id;
    const {location_type,room,floor_no,description}=req.body;
    const value = {id:locId,location_type,room,floor_no,description};
    
    try {
        const isLoc = await Location.getLoc(locId);
        
        if(isLoc.length>0){
            const response = await Location.update(value);
            if(response.affectedRows==1)
                res.status(200).json({message:"Location updated successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"Location not Found"});
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Internal Server Error!"});
    }

});

//delete department
const del = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    //console.log("fn triggered ",id)
    try {
        const isLoc = await Location.getLoc(id);
        console.log(isLoc)
        if(isLoc.length>0){
            const response = await Location.del(id);
            if(response.affectedRows==1)
                res.status(200).json({message:"Deleted successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"Location not Found"});
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error!"});
    }

});



module.exports = {
    create,
    bulkCreate,
    getAllLoc,
    getLoc,
    update,
    del,
    getLocByRoom
}