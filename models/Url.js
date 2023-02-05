const mongoos=require('mongoose');
const urlSchema=new mongoos.Schema({
    urlCode:String,
    longUrl:String,
    shortUrl:String,
    date:{type:String , defualt:Date.now}

});
module.exports=mongoos.model('Url',urlSchema);