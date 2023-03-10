const express=require('express');
const router=express.Router();
const Url=require('../models/Url');
//@route   GET /:code
//@desc    Redirct to long/Original
router.get('/:code',async (req,res)=>{
    try{
        const url=await Url.findOne({urlCode:req.params.code});
        if(url){
            return res.redirect(url.longUrl);

        }else{
            return res.status(404).json('No url found');

        }

    }catch(err){
        console.log(err);
        res.status(500).json('server error');

    }
});
module.exports=router;