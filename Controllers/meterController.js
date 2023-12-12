const Meter = require('../Models/Meter');
const AllJobs = require('../Models/AllJobs');
const asyncHandler = require('express-async-handler');

//create meter
const create =asyncHandler(async (req, res)=>{
    try {
        const {meter_code, floor_no, created_date, time, description, create_by}= req.body;
        const createdId = create_by[0];
        const insertedId = create_by[1];
        const values = {meter_code, floor_no, created_date, time, description, create_by:createdId}
        
        const response = await Meter.create(values);
        if(response.affectedRows == 1){
            
            const getLastId = response.insertId;
            const meterJobNo = "MN" + (getLastId + 101);
                
            const values2 = {meter_job_no:meterJobNo,meter_code, floor_no,  time,created_date, description, create_by:createdId, meter_id:getLastId};
            const response2 = await Meter.createMeterJob(values2);
            const value2= {
                job_id:response2.insertId, 
                created_date:created_date, 
                insert_by:insertedId, 
                job_no:meterJobNo, 
                job_type:"Meter", 
                deadline:time, 
                location:floor_no, 
                comments:description, 
                status:"pending"
            }
            const response3 = await AllJobs.create(value2);
            if(response.affectedRows == 1)
                res.status(201).json({message:"Record insertion successful"});
            else
            res.status(503).json({error:"Record insertion failed!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});

const getAllReadings = asyncHandler(async (req, res)=>{
    try {
        const response = await Meter.getAllReadings();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:"Internal server error!"});
    }
});

const getReading = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try {
        const response = await Meter.getReading(id);
        console.log(response.length)
        if(response.length !=0)
            res.status(200).json(response);
        else
            res.status(404).json({error:"No contents!"});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error!"});
    }
});

//update 
const update = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const{meter_code, floor_no, time, description}=req.body;
    const values = {meter_code, floor_no, time, description, id:id};
    try {
        const response = await Meter.getReading(id);
        if(response.length>0){
            const response2 = await Meter.update(values)
            const response3 = await Meter.updateMeterJob(values);
            
            if( response2.affectedRows &&response3.affectedRows){
                res.status(201).json({message:"Record update successful"});
            }else
            res.status(204).json({message:"Record update failed!"});
        }else
        res.status(404).json({error:"Item not found!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});

// delete
const del = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    try {
        const isReading = await Meter.getReading(id);
        //console.log(isReading)
        if(isReading.length>0){
            const response = await Meter.del(id);
            if(response.affectedRows==1)
                res.status(200).json({message:"Deleted successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"Reading not Found"});
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Internal Server Error!"});
    }

});


module.exports = {create,getAllReadings,getReading,update,del}