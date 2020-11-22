import User from '../models/pengajarModel.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const pengajarRouter = express.Router();

pengajarRouter.use(bodyParser.json()); // support json encoded bodies
pengajarRouter.use(bodyParser.urlencoded({ extended: true }));


//@desc add new user
//@route POST/api/user/ad
pengajarRouter.post('/register', async (req, res) => {
  try{
      const{
        nama,
        username,
        alamat,
        no_telp,
        email,
        tempat_lahir,
        tanggal_lahir,
        password,
        keahlian,
        deskripsi
    } = req.body;

      //digit angka mau berapa banyak
      var saltRounds = 10;
      const hashedPw = await bcrypt.hash(password, saltRounds);

      const pengajar = await User.findOne({username})
      if (pengajar){res.status(400).json({error:"Username already taken"})
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
        "password": hashedPw,
        "keahlian": keahlian,
        "deskripsi": deskripsi
      });


      const createdUser = await newUser.save();
      res.status(200).json(createdUser);

  }
  catch(error){
      res.status(500).json({ error: error})
  }
})

pengajarRouter.post('/login', async(req,res)=>{

    const pengajar = await User.findOne({username : req.body.username})
    console.log(pengajar)
    if (!pengajar) return res.status(400).json({ error: "Username is wrong = "+req.body.username })
      const validPassword = await bcrypt.compare(req.body.password, pengajar.password)
      if (!validPassword)
      return res.status(400).json({ error: "Password is wrong= "+req.body.username })
      const token = jwt.sign(
          // payload data
      {
          username: pengajar.username,
          id: pengajar._id,
          roles:1,
      },
      process.env.TOKEN_SECRET,{expiresIn: "7120 m"}
      )
      res.status(200).json({
      error: null,
      data: {
          token
      }
      })
  })

  //Update password
  pengajarRouter.put('/update/:id', async (req,res,next) => {
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
pengajarRouter.get('/logout', async(req,res)=>{
    const token = null
    res.status(200).send({ auth: false, token: token });
  })
pengajarRouter.get('/show/:id', async(req,res)=>{
    const token = null
    const {id}  = req.params.id;
    const data  = User.findById(id);
    res.status(200).send(data);
  })
pengajarRouter.get('/all', async(req,res)=>{
  try{
    const h = await User.find();
    res.status(200).json(h);

  }catch(error){
      res.status(500).json({ error: error})
  }
})


export default pengajarRouter;
