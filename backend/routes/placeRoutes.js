const express=require('express');
const router=express.Router();
const Place=require('../models/place');


router.get('/',async(req,res)=>{
    try{
        const places=await Place.find();
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.json(place);
});

router.post
module.exports=router;