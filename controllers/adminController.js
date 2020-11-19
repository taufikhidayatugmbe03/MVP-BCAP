import User from '../models/adminModel.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const adminRouter = express.Router();

//@desc add new admin
//@route POST/api/admin/register
adminRouter.post('/register', async (req, res) => {
  try{
      const{
          username,
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
          "username":username,
          "password": hashedPw
      });


      const createdUser = await newUser.save();
      res.status(200).json(createdUser);

  }
  catch(error){
      res.status(500).json({ error: error})
  }
})

adminRouter.get('/login', async(req,res)=>{
 
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

adminRouter.put('/update/:id', async (req,res) => {

    //header apabila akan melakukan akses
    var token = req.headers['auth-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
                const {username, password} = req.body;
    
                const user = await User.findById(req.params.id);
            
                if (user) {
            
                    var saltRounds = 10;
                    const hashedPw = await bcrypt.hash(password, saltRounds);
                    user.username = username;
                    user.password = hashedPw;
            
                    const updateDatauser = await user.save()
            
                    res.send(updateDatauser);
                } else {
                    res.status(404).json({
                        message: 'User not found'
                    })
            }
        })

//Logout
adminRouter.get('/logout', async(req,res)=>{
    const token = null
    res.status(200).send({ auth: false, token: token });
  })


export default adminRouter;