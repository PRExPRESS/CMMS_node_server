const Settings = require('../Models/Settings');
const asyncHandler = require('express-async-handler');


// get settings

const getSettings = asyncHandler(async (req, res)=>{
    try {
        const response = await Settings.getSettings();
        if(response.length>0){
            res.status(200).json(response);
        }else{
            res.status(204).json({error:"Records not found!"});

        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//update settings
const update = asyncHandler(async(req, res)=>{
    const {
        id,updated_date, daily_occupancy, no_of_rooms, guest_nights, notice, all, eng, tech, sms
    }=req.body
    const values = {id,updated_date, daily_occupancy, no_of_rooms, guest_nights, notice, all, eng, tech, sms}

    try {
        const response = await Settings.update(values);
        if(response.affectedRows){
            res.status(201).json({message:"Settings updated!"})
        }
    } catch (error) {
        res.status(500).json({error:"Internal server error!"})
    }

});

module.exports = {
    getSettings,
    update
}