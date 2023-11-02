const express = require('express');
const Accounts = require('../models/User');

const router = express.Router();

//Create accountzootrainer
// router.post('/accountzootrainers/create',(req,res)=>{

//     let newAccountZootrainer = new AccountZootrainers(req.body);

//     newAccountZootrainer.save((err) => {
//         if(err){
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         return res.status(200).json({
//             success:"AccountZootrainer Created successfully"
//         });
//     });
// });

//get accountzootrainer

router.get('/accountzootrainers',(req,res)=>{
    Accounts.find({isTrainer: true}).exec((err,accountzootrainers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingAccountZootrainers:accountzootrainers
        });
    });
});

//get a specific post

router.get('/accountzootrainers/:id',(req,res) =>{
    
    //let accountzootrainerId = req.params.id;

    Accounts.findById(req.params.id,(err,accountzootrainer) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            accountzootrainer
        });
    });
});

//update posts

router.put('/accountzootrainers/update/:id',(req,res)=>{
    Accounts.findByIdAndUpdate(
        req.params.id,
        {
            $set:{isTrainer: false, isUser: true}
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

// router.delete('/accountzootrainers/delete/:id', (req,res)=>{
//     Accounts.findByIdAndRemove(req.params.id).exec((err,deletedAccountZootrainer) => {
//         if(err) return res.status(400).json({
//             message:"Delete unsuccesful",err
//         });

//         return res.json({
//             message:"Delete Succesfull", deletedAccountZootrainer
//         });
//     });
// });

module.exports = router;   