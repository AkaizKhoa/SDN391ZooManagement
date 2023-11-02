const express = require('express');
const Accounts = require('../models/User');

const router = express.Router();

//Create account
// router.post('/account/create',(req,res)=>{

//     let newAccount = new Account(req.body);

//     newAccount.save((err) => {
//         if(err){
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         return res.status(200).json({
//             success:"Account Created successfully"
//         });
//     });
// });

//get account

router.get('/accounts',(req,res)=>{
    Accounts.find({}).exec((err,account) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingAccount:account
        });
    });
});

//get a specific post

router.get('/account/:id',(req,res) =>{
    
    //let accountId = req.params.id;

    Accounts.findById(req.params.id,(err,account) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            account
        });
    });
});

//update posts

router.put('/account/updateTrainer/:id',(req,res)=>{
    Accounts.findByIdAndUpdate(
        req.params.id,
        {
            $set:{isTrainer: true, isUser: false, isStaff: false}
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



router.put('/account/updateStaff/:id',(req,res)=>{
    Accounts.findByIdAndUpdate(
        req.params.id,
        {
            $set:{isTrainer: false, isUser: false, isStaff: true}
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


router.put('/account/updateUser/:id',(req,res)=>{
    Accounts.findByIdAndUpdate(
        req.params.id,
        {
            $set:{isTrainer: false, isUser: true, isStaff: true}
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

// router.delete('/account/delete/:id', (req,res)=>{
//     Accounts.findByIdAndRemove(req.params.id).exec((err,deletedAccount) => {
//         if(err) return res.status(400).json({
//             message:"Delete unsuccesful",err
//         });

//         return res.json({
//             message:"Delete Succesfull", deletedAccount
//         });
//     });
// });

module.exports = router;   