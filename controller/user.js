const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt  =  require("jsonwebtoken")
exports.createuser = async (req, res) => {
  const details = {
    email: req.body.email,
    password: req.body.password,
    // name:req.body.name,
    confirmpassword: req.body.confirmpassword,
  };
  // console.log("name is ",details.name)
  try {
    let result = await User.findOne({ where: { email: details.email } });

    if (result) {
      res.send({ message: " email alreay exists 💀" });
      // console.
    } else if (details.password != details.confirmpassword) {
      console.log("first", details.password, "s", details.confirmpassword);
      res.send({ message: "Password not same in both field 💀" });
     
    } 
    else if (details.email) {
      details.password = bcrypt.hashSync(req.body.password,10)
      let user = await User.create(details);
      res.send({ message: "user created succcesful ✔️✔️", email: user.email });
      return;
    }
  } catch (error) { 
    res.send({ message: error.message });
    console.log(error)
  }
};

exports.loginpage = async (req, res) => {
  try {
    details = {
      email: req.body.email,
      password: req.body.password,
    };

    let result = await User.findOne({ where: { email: details.email } });
    if (!result) {
      res.send({ message: " invalid user" });
      return;
    }

    let validpsswd = bcrypt.compareSync(details.password, result.password);

    if (!validpsswd) {
      res.send({ message: "credential invalid" });
      return;
    }
    let token = jwt.sign({ id: result.id }, "surajsingh", {
      expiresIn: "1h",
    });
    res.json({ message: "login successfull 🎉 ", token: token });
    console.log(token);
  } catch (error) {
    res.send(error.message); 
  }
};



exports.getalluser = async(req,res)=>{
  try{
     const finduser = await User.findAll();
     const  usersWithEmail = finduser.map(user=>({
        gmail:user.email,
        password:user.password
     }))
  
     
     res.status(200).send({usersWithEmail})
    // res.send(finduser)
     
  }
  catch(err){
    res.status(500).send(err.message)
    console.log("error is ", err)
  }
}



exports.edituser = async(req,res)=>{
  
  // const name = req.body.name;
  try{
    const id = req.params.id
    const result = await User.findOne({id:id})
    if(!result){
      res.send("user not found")
    } 
    // else if (result.password!== result.confirmPassword) {
    //   res.status(400).send('Passwords do not match');
    //   // return;
    // }

    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password,10)
    const confirmPassword = req.body.confirmPassword;
    
    User.update(
      {  email,password,confirmPassword },
      
      { where: { id } }
      
    )
    
      .then(() => {
        res.send("edit successfull");
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error updating user');
      });

 
 
  }
  catch(err){
    res.send(err.message)
  }
  
  
  
    
}


exports.deleteuser = async(req,res)=>{
  try{
    const id = req.params.id
    const result = await User.destroy({where:{id}})
    res.status(200).send(`User with ID ${id} deleted successfully`)
  }
  catch(err){
    res.status(500).send(err.message)
  }
   
}