const Resource = require("../models/resourceModel");

// Get All
exports.getResources = (req,res)=>{

Resource.getAllResources((err,data)=>{

if(err){

return res.status(500).json(err);

}

res.json(data);

});

};

// Get One
exports.getResource=(req,res)=>{

Resource.getResourceById(

req.params.id,

(err,data)=>{

if(err){

return res.status(500).json(err);

}

res.json(data);

});

};

// Create
exports.createResource=(req,res)=>{

Resource.createResource(

req.body,

(err,result)=>{

if(err){

return res.status(500).json(err);

}

res.json({

message:"Resource Added Successfully"

});

});

};

// Update
exports.updateResource=(req,res)=>{

Resource.updateResource(

req.params.id,

req.body,

(err)=>{

if(err){

return res.status(500).json(err);

}

res.json({

message:"Resource Updated"

});

});

};

// Delete
exports.deleteResource=(req,res)=>{

Resource.deleteResource(

req.params.id,

(err)=>{

if(err){

return res.status(500).json(err);

}

res.json({

message:"Resource Deleted"

});

});

};