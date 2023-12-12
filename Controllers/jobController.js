const Job = require('../Models/Jobs');
const AllJobs = require('../Models/AllJobs');
const asyncHandler = require('express-async-handler');

//create locations
const create = asyncHandler(async(req,res)=>{
    const {insert_by,created_date,critical,floor_no,
        location,equipment,comments,category,created_by}= req.body;

    const pictureFiles = req.files || [];
    const pictureFileNames = pictureFiles.map(file => file.filename);

    // Convert arrays to comma-separated strings
    const picturesNames = pictureFileNames.join(',');

    try {
        const responseJobNo = await Job.getJobNo();
        
        const jobNo = +responseJobNo[0].job_no+1;
        
        const Val = {insert_by,created_date,job_no:jobNo,critical,floor_no,
            occupied:'',location,equipment,comments,photos:picturesNames|| '',status:"Pending",category,created_by};
        const response = await Job.create(Val);
        
        if(response.affectedRows ==1){
            res.status(201).json({message:"New record insert successful"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error!"});
    }
});
//get all locations
const getJobNo = asyncHandler(async(req,res)=>{
   
    try {
        const response = await Job.getJobNo();
        if(response.length >0){
            res.status(200).json(response);
        }else{
            res.status(404).json({message:"No records found!"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error!"});
    }
});

//get all locations
const getAllJob = asyncHandler(async(req,res)=>{
   
    try {
        const response = await Job.getAllJobs();
        if(response.length >0){
            res.status(200).json(response);
        }else{
            res.status(404).json({message:"No records found!"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error!"});
    }
});

//get location
const getJob = asyncHandler(async(req,res)=>{
   const id = req.params.id;
    try {
        const response = await Job.getJob(id);
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
    console.log(req.files)
    const id = req.params.id;
    const {critical,date,floor_no,location,equipment,comments}= req.body;

    const pictureFiles = req.files || [];
    
    const pictureFileNames = pictureFiles.map(file => file.filename);

    // Convert arrays to comma-separated strings
    let picturesNames = pictureFileNames.join(',');

    try {
        
        const isJob = await Job.getJob(id);
        picturesNames = picturesNames ? picturesNames : isJob.photos || '';
        console.log("pictures:",picturesNames)
        const value = {critical,date,floor_no,location,equipment,comments,photos:picturesNames || '',id};
        

        if (isJob.length > 0) {
            const response = await Job.update(value);
            if (response.affectedRows === 1) {
                res.status(200).json({ message: 'Job updated successfully' });
                
            } else {
                res.status(500).json({ error: 'Failed to update job details' });
            }
        } else {
            res.status(404).json({ error: 'Equipment not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Internal Server Error!",error});
    }

});
//edit jobs
const edit = asyncHandler(async (req,res)=>{
    console.log(req.files)
    const id = req.params.id;
    const {deadline,asign_to,update_comments,update_cost,status}= req.body;

    const pictureFiles = req.files || [];
    
    const pictureFileNames = pictureFiles.map(file => file.filename);

    // Convert arrays to comma-separated strings
    let picturesNames = pictureFileNames.join(',');

    try {
        
        const isJob = await Job.getJob(id);
        picturesNames = picturesNames ? picturesNames : isJob.photos || '';
        const _deadline =deadline !==''?deadline: isJob.deadline;
        const _assign_to= asign_to !==''?asign_to :isJob.assign_to;
        const _updateComments = update_comments !==''?update_comments:isJob.update_comments || '';
        const _updateCost = update_cost !==''?update_cost:isJob.update_cost || '';
        const _status = status !==''?status:isJob.status || '';
        const value = {
            deadline:_deadline,
            asign_to:_assign_to,
            update_comments:_updateComments,
            update_cost:_updateCost,
            status:_status,
            uploads:picturesNames || '',id};
        

        if (isJob.length > 0) {
            const response = await Job.edit(value);
            if (response.affectedRows === 1) {
                res.status(200).json({ message: 'Job updated successfully' });
                
            } else {
                res.status(500).json({ error: 'Failed to update job details' });
            }
        } else {
            res.status(404).json({ error: 'Equipment not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Internal Server Error!",error});
    }

});

//delete department
const del = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    //console.log("fn triggered ",id)
    try {
        const isLoc = await Job.getJob(id);
        
        if(isLoc.length>0){
            const response = await Job.del(id);
            if(response.affectedRows==1)
                res.status(200).json({message:"Deleted successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"Job not Found"});
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Internal Server Error!"});
    }

});



module.exports = {
    create,
    getAllJob,
    getJob,
    update,
    edit,
    del,
    getJobNo
}