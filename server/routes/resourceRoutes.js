const express=require("express");

const router=express.Router();

const controller=require("../controllers/resourceController");

// Read All
router.get("/",controller.getResources);

// Read One
router.get("/:id",controller.getResource);

// Create
router.post("/",controller.createResource);

// Update
router.put("/:id",controller.updateResource);

// Delete
router.delete("/:id",controller.deleteResource);

module.exports=router;