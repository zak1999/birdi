const Users = require('../models/users.models')



async function collectUserInfo (req, res) {
  
  console.log("reqbody",req.body)
  if (req.body.email)
  try {
    //looks to see if email exists,
    const results = await Users.find({email:req.body.email})
    //if it doesn't create a new 'user' in table with that email
    if (results.length===0) {
    const newdoc = await Users.create({email:req.body.email})
    console.log(newdoc)
    res.status(200).send(newdoc)
    } else {
      console.log("found")
      res.status(200).send(results[0])
    }
  } catch (err) {
    console.log(err)
    res.status(500).send("Something went wrong")
  }
}

module.exports = {collectUserInfo}