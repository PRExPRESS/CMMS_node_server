const Equipment = require('../Models/Equipment');
const asyncHandler = require('express-async-handler');

//create locations
const create = asyncHandler(async(req,res)=>{
    const {code_no,name, category,description,room_no,
        start_date,last_date,next_date,frequency}= req.body;

    const pictureFiles = req.files['picture[]'] || [];
    const userManuals = req.files['user_manuals[]'] || [];
    console.log(pictureFiles)

    const pictureFileNames = pictureFiles.map(file => file.filename);
    const userManualFileNames = userManuals.map(file => file.filename);

    // Convert arrays to comma-separated strings
    const picturesNames = pictureFileNames.join(',');
    const manualsNames = userManualFileNames.join(',');

    //console.log('Picture filenames:', picturesNames);
    //console.log('User manual filenames:', manualsNames);


    // console.log("Pictures:",picturesNames);
    const Val = {code_no,name, category,description,room_no,picture:picturesNames || '',user_manuals:manualsNames || '',
        start_date,last_date,next_date,frequency};

    try {
        const response = await Equipment.create(Val);
        if(response.affectedRows ==1)
            res.status(201).json({message:"New record insert successful"});
    } catch (error) {
        res.status(500).json({error:"Internal server error!"});
    }
});

//get all locations
const getAllReadings = asyncHandler(async(req,res)=>{
   
    try {
        const response = await Equipment.getAllReadings();
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
const getReading = asyncHandler(async(req,res)=>{
   const id = req.params.id;
    try {
        const response = await Equipment.getReading(id);
        if(response.length >0){
            res.status(200).json(response);
        }else{
            res.status(404).json({message:"No record found!"});
        }
    } catch (error) {
        res.status(500).json({error:"Internal server error!"});
    }
})

//update location
const update = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    const {code_no,name, category,description,room_no,
        start_date,last_date,next_date,frequency}= req.body;

    const pictureFiles = req.files['picture[]'] || [];
    const userManuals = req.files['user_manuals[]'] || [];
    

    const pictureFileNames = pictureFiles.map(file => file.filename);
    const userManualFileNames = userManuals.map(file => file.filename);

    // Convert arrays to comma-separated strings
    const picturesNames = pictureFileNames.join(',');
    const manualsNames = userManualFileNames.join(',');

    //console.log('Picture filenames:', picturesNames);
    //console.log('User manual filenames:', manualsNames);


    // console.log("Pictures:",picturesNames);
    const value = {code_no,name, category,description,room_no,picture:picturesNames || '',user_manuals:manualsNames || '',
        start_date,last_date,next_date,frequency,id};
    //console.log("fn triggered ",id)
    try {
        const isEqp = await Equipment.getReading(id);
        
        if(isEqp.length>0){
            const response = await Equipment.update(value);
            if(response.affectedRows==1)
                res.status(200).json({message:"Equipment updated successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"Equipment not Found"});
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error!"});
    }

});

//delete department
const del = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    //console.log("fn triggered ",id)
    try {
        const isLoc = await Equipment.getReading(id);
        console.log(isLoc)
        if(isLoc.length>0){
            const response = await Equipment.del(id);
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
    getAllReadings,
    getReading,
    update,
    del
}