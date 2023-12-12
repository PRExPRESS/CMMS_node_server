const User = require('../Models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const nodemailer=require('nodemailer');
const sendMail = require('../Middleware/sendMail');



const createUser = asyncHandler(async (req, res) => {
    const {
        email,userType,department,
        job_add,job_edit,job_view,
        dep_add,dep_edit,dep_view,loc_add,loc_edit,
        loc_view,rost_add, rost_edit, rost_view, 
        meter_add,meter_edit,meter_view, setting, 
        cat_add, cat_edit, cat_view, eqp_add, eqp_edit,
        eqp_view, super_up, admin_up, tech_up, user_up, user_view,
        pending_job, complete_job, cancel_job, total_job,
        jobcomplete_technician, floorwise_job, departwise_job,
        holdpm_work, completepm_work,upcomingpm_work
    } = req.body;
    

    try {
        
        const userData = {
            email,user_type:userType,department,
        };
        
        // check username and email already taken

        let isEmailTaken = false;
        
        let userID=0;

        isEmailTaken = await User.checkUserEmail(email);
        

        if (isEmailTaken){
            res.json({error:"This email already taken!"});
            return null;
        };
        
        User.create(userData,(err, userId) => {
            userID = userId;
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error creating user',err });
                return null;
                
            }
            const emailResponse =  sendMail(email,userId);
            //if(emailResponse.Messages[0].Status ==='success'){
                res.json({ message: 'User created successfully' });
            //}
            //user privileges
            const userPrivileges ={
                    user_id:userID,
                    job_add:job_add ||'',
                    job_edit: job_edit || '',
                    job_view: job_view || '',
                    dep_add:dep_add || '',
                    dep_edit:dep_edit || '',
                    dep_view:dep_view || '',
                    loc_add: loc_add || '',
                    loc_edit: loc_edit || '',
                    loc_view: loc_view || '',
                    rost_add: rost_add || '', 
                    rost_edit: rost_edit || '', 
                    rost_view: rost_view || '', 
                    meter_add: meter_add || '',
                    meter_edit: meter_edit || '',
                    meter_view: meter_view || '', 
                    setting: setting || '', 
                    cat_add: cat_add || '', 
                    cat_edit: cat_edit || '', 
                    cat_view: cat_view || '', 
                    eqp_add: eqp_add || '', 
                    eqp_edit: eqp_edit || '',
                    eqp_view: eqp_view || '', 
                    super_up: super_up || '', 
                    admin_up: admin_up || '', 
                    tech_up: tech_up || '', 
                    user_up: user_up || '', 
                    user_view : user_view || '',
                    pending_job: pending_job || '', 
                    complete_job: complete_job || '', 
                    cancel_job: cancel_job || '', 
                    total_job: total_job || '',
                    jobcomplete_technician: jobcomplete_technician || '', 
                    floorwise_job: floorwise_job || '', 
                    departwise_job: departwise_job || '',
                    holdpm_work: holdpm_work || '', 
                    completepm_work: completepm_work || '',
                    upcomingpm_work: upcomingpm_work || ''
            }
            const privileges =  User.createUserPrivileges(userPrivileges);
        });
        
        
        

        
        

        //res.json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// complete user account
const createAccount = asyncHandler(async(req,res)=>{
    let {uid,name,username,sap,contact,password} = req.body;
    const pictureFile = req.file;
    
    const avatar = pictureFile ? pictureFile.filename : '';
    const status = 'active';
    try {
        const isUser = await User.getUser(uid);
        if(isUser.length<0){
            res.json({error:"User not found!"});
            return null;
        }
        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(password, 10);

        let isUsernameTaken = false;
        isUsernameTaken = await User.checkUsername(username);

        if(isUsernameTaken){
            res.json({error:"This username already taken!"});
            return null;
        }

        const user =[uid,status,name,username,sap,contact,password= hashedPassword,picture=avatar];
        
        User.createUserAccount(user,(err,affectedRows)=>{
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error creating user',err });
                return null;
                
            }
            res.json({ message: 'User account created successfully!', affectedRows });
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// get all users
const getAllUsers = asyncHandler(async (req, res)=>{
    try {
        const users= await User.getAllUsers();
        //console.log("users:",users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:"Internal server Error"})
    }
});

//login fn
const login =asyncHandler(async (req,res)=>{
    try {
        const {username,password}=req.body;

        const response = await User.userLogin(username);
        if(response.length>0){
            const isPasswordMatch = await bcrypt.compare(password,response[0].password)
            if(isPasswordMatch){
                res.status(200).json({message:"Login successful"});
            }else{
                res.status(401).json({message:"Password missed match"});
            }
        }else{
            res.status(401).json({message:"Username invalid"});
        }
        
        

    } catch (error) {
        res.status(500).json({error:"Internal server Error"})
    }
});

//get single user
const getUser =asyncHandler(async(req,res)=>{
    const userId = req.params.id;
    
    const user = await User.getUser(userId);
    if(!user){
        res.status(404);
        throw new Error("User not found!")
    }
    
    res.status(200).json(user)
});

// update user
const updateUser = asyncHandler(async(req,res)=>{
    const usrId = req.params.id;
    const pictureFile = req.file;
    console.log("image is ",pictureFile)
    
    const avatar = pictureFile ? pictureFile.filename : '';
    const {
        user_type,name,sap,departments,email,tel_no,
        job_add,job_edit,job_view,
        dep_add,dep_edit,dep_view,loc_add,loc_edit,
        loc_view,rost_add, rost_edit, rost_view, 
        meter_add,meter_edit,meter_view, setting, 
        cat_add, cat_edit, cat_view, eqp_add, eqp_edit,
        eqp_view, super_up, admin_up, tech_up, user_up, user_view,
        pending_job, complete_job, cancel_job, total_job,
        jobcomplete_technician, floorwise_job, departwise_job,
        holdpm_work, completepm_work,upcomingpm_work
    }=req.body;
    
    
    //console.log("user",userData);
    try {
        const isUser = await User.getUser(usrId);
        
        if(isUser !=null){
            const currentImage = isUser[0].picture;
            let profilePicture = avatar;
            if (!pictureFile) {
                profilePicture = currentImage;
            }
            const userData = {
                user_id:usrId,user_type,name,sap,departments,email,tel_no,picture:profilePicture,
                job_add,job_edit,job_view,
                dep_add,dep_edit,dep_view,loc_add,loc_edit,
                loc_view,rost_add, rost_edit, rost_view, 
                meter_add,meter_edit,meter_view, setting, 
                cat_add, cat_edit, cat_view, eqp_add, eqp_edit,
                eqp_view, super_up, admin_up, tech_up, user_up, user_view,
                pending_job, complete_job, cancel_job, total_job,
                jobcomplete_technician, floorwise_job, departwise_job,
                holdpm_work, completepm_work,upcomingpm_work
            };
            const user = await User.editUser(userData)
            
            if(user){
                res.status(200).json({message:"User data updated"})
            }else{
                res.status(400).json({message:"User not updated!"})
            }
            
        }else{
            res.status(404).json({error:"User not found!"})
        }
        
    } catch (error) {
        console.log("Error is:",error)
        res.status(500).json({error:"Internal server error!"})
    }
    
})






//forget password
const forgetPassword =asyncHandler (async (req, res)=>{
    const email= req.params.email;
    const transporter = nodemailer.createTransport({
        service :'gmail',
        
        auth:{
            user:'pasinduadikari922@gmail.com',
            pass:'xqraxzyzahpxiukl'
        }
    });
    const randKey = randomKey()

    const mailOptions = {
        from: 'pasinduadikari922@gmail.com',
        to: email,
        subject: 'Reset Password Key',
        text: randKey
      }; 

    //send mail
    transporter.sendMail(mailOptions,(err, info)=>{
        if(err) res.json({error:err});
        else res.json({mailSentInfo:info.response});
    })


});

function randomKey() {
    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const pass = [];
    const alphaLength = alphabet.length - 1;

    for (let i = 0; i < 16; i++) {
        const n = Math.floor(Math.random() * (alphaLength + 1));
        pass.push(alphabet[n]);
    }

    return pass.join('');
}

//change user password
const changePassword = asyncHandler(async(req,res)=>{
    const {id,password} = req.body;
    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {userId:id,password:hashedPassword};
    try {
        const isUser = await User.getUser(id);
        
        if(isUser !=null){
            
            const user = await User.changePassword(userData)
            
            if(user){
                res.status(200).json({message:"New password changed!"})
            }else{
                res.status(400).json({message:"User not updated!"})
            }
            
        }else{
            res.status(404).json({error:"User not found!"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error!"})
    }
});

//change user status
const changeStatus = asyncHandler(async(req,res)=>{
    const {id,status} = req.body;
    // Hash the password asynchronously
    
    const userData = {userId:id,status};
    try {
        const isUser = await User.getUser(id);
        
        if(isUser !=null){
            
            const user = await User.changeStatus(userData)
            
            if(user){
                res.status(200).json({message:"Profile status changed!"})
            }else{
                res.status(400).json({message:"User not updated!"})
            }
            
        }else{
            res.status(404).json({error:"User not found!"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error!"})
    }
});

// inactive users
const inactiveUsers = asyncHandler(async (req, res)=>{
    
    try {
        const users= await User.inactive();
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:"Internal server Error"});
    }
});

// get tech
const getTech = asyncHandler(async (req, res)=>{
    
    try {
        const users= await User.getTech();
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:"Internal server Error"});
    }
});


module.exports = {
    createUser,
    getAllUsers,
    login,
    forgetPassword,
    getUser,
    updateUser,
    createAccount,
    changePassword,
    changeStatus,
    inactiveUsers,
    getTech
}