const express = require("express");
const router = express.Router();

const User = require("../models/User");
const protect  = require("../middleware/authMiddleware");


router.put("/update", protect, async(req,res)=>{

try{

const user = await User.findByIdAndUpdate(
req.user.id,
{
name:req.body.name,
phone:req.body.phone,
address:req.body.address
},
{
new:true
}
);


res.json(user);


}
catch(err){

console.log(err);

res.status(500).json({
message:"Update failed"
});

}

});

router.put("/password", protect, async(req,res)=>{

try{

const User = require("../models/User");
const bcrypt = require("bcryptjs");


const user = await User.findById(req.user.id);


if(!user){
  return res.status(404).json({
    message:"User not found"
  });
}


const hashedPassword = await bcrypt.hash(
  req.body.password,
  10
);


user.password = hashedPassword;


await user.save();


res.json({
  message:"Password updated"
});


}
catch(err){

console.log(err);

res.status(500).json({
  message:"Password update failed"
});

}

});


module.exports = router;