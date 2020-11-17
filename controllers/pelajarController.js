import User from '../models/pelajarModel.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const pelajarRouter = express.Router();

//@desc add new user
//@route POST/api/user/add
pelajarRouter.post('/register', async (req, res) => {
  try{
      const{
          nama,
          username,
          alamat,
          no_telp,
          email,
          tempat_lahir,
          tanggal_lahir,
          password
      } = req.body;

      //digit angka mau berapa banyak
      var saltRounds = 10;
      const hashedPw = await bcrypt.hash(password, saltRounds);

      const pelajar = await User.findOne({username})
      if (pelajar){res.status(400).json({error:"Username already taken"})
      return
      }

      const newUser = new User({
          "nama":nama,
          "username":username,
          "alamat": alamat,
          "no_telp": no_telp,
          "email": email,
          "tempat_lahir": tempat_lahir,
          "tanggal_lahir": tanggal_lahir,
          "password": hashedPw
      });


      const createdUser = await newUser.save();
      res.status(200).json(createdUser);

  }
  catch(error){
      res.status(500).json({ error: error})
  }
})

pelajarRouter.get('/login', async(req,res)=>{
 
    const pelajar = await User.findOne({username : req.body.username})
    console.log(pelajar)
    if (!pelajar) return res.status(400).json({ error: "Username is wrong" })
      const validPassword = await bcrypt.compare(req.body.password, pelajar.password)
      if (!validPassword)
      return res.status(400).json({ error: "Password is wrong" })
      const token = jwt.sign(
          // payload data
      {
          username: pelajar.username,
          id: pelajar._id
      },
      process.env.TOKEN_SECRET,{expiresIn: "5 m"}
      )
      res.status(200).json({
      error: null,
      data: {
          token
      }
      })
  })

  //Update password
  pelajarRouter.put('/update/:id', async (req,res,next) => {
    const {error} = User(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('User account not found.');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.save();
    res.status(200).json('Success')
});

//Logout
pelajarRouter.get('/logout', async(req,res)=>{
    const token = null
    res.status(200).send({ auth: false, token: token });
  })


export default pelajarRouter;