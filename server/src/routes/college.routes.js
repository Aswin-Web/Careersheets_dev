const express=require("express");
const router=express.Router()
const {getUsers,addCollege,getUserById}=require("../controllers/college.controller");
const { authenticateUser } = require("../utils/authorisation.header.check");

// getUsers
router.use(authenticateUser);

router.get("/",getUsers)
router.post("/selectcollege",addCollege)
router.get("/:id",getUserById)


module.exports=router