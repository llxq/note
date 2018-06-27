var fs=require("fs");
fs.writeFile("txtFile/你好.txt","这他妈写不进去我就真的服了",function(error){
    if(error){
        console.log("写入失败");
    }else{
        console.log("写入成功");
    }
}); 