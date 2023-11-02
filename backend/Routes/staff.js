const express = require('express');
const Accounts = require('../models/User');

const router = express.Router();

//Create accountstaff
// router.post('/accountstaff/create',(req,res)=>{

//     let newAccountstaff = new AccountStaff(req.body);

//     newAccountstaff.save((err) => {
//         if(err){
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         return res.status(200).json({
//             success:"Accountstaff Created successfully"
//         });
//     });
// });

//get accountstaff

router.get('/accountstaffs',(req,res)=>{
    Accounts.find({isStaff: true}).exec((err,accountstaff) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingAccountStaff: accountstaff
        });
    });
});

//get a specific post

router.get('/accountstaff/:id',(req,res) =>{
    
    //let accountstaffId = req.params.id;

    Accounts.findById(req.params.id,(err,accountstaff) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            accountstaff
        });
    });
});

//update posts

router.put('/accountstaff/update/:id',(req,res)=>{
    Accounts.findByIdAndUpdate(
        req.params.id,
        {
            $set:{isStaff: false, isUser: true, isAdmin: false, isTrainer: false}
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }
        
            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});



//delete post

// router.delete('/accountstaff/delete/:id', (req,res)=>{
//     Accounts.findByIdAndRemove(req.params.id).exec((err,deletedAccountstaff) => {
//         if(err) return res.status(400).json({
//             message:"Delete unsuccesful",err
//         });

//         return res.json({
//             message:"Delete Succesfull", deletedAccountstaff
//         });
//     });
// });

module.exports = router;   