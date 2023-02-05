const express=require('express');
const router=express.Router();
const validUrl=require('valid-url');
const shortId=require('shortid');
const config=require('config');
const Url=require('../models/Url');
const { base } = require('../models/Url');
//@route   POST /api/url/shorten
//@desc    create short url
router.post('/shorten',async (req,res)=>{
    const {longUrl}=req.body;
    const baseUrl=config.get('baseUrl');
    //check base
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base Url');

    }
    //create url code
    const urlCode=shortId.generate();
    //check long url
    if(validUrl.isUri(longUrl)){
        try{
            let url=await Url.findOne({longUrl});
            if(url){
                res.json(url);
            }else{
                const shortUrl=baseUrl+'/'+urlCode;
                url=new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date:new Date()
                });
                await url.save();
                res.json(url);

                
            }

        }catch(err){
            console.log(err);
            res.status(500).json('server error');

        }

    }
    else{
        res.status(401).json('invalid long URL');

    }


});
module.exports=router;