import User from '../models/pelajarModel.js';
import {EnrolKelas,PelajarJoined} from '../models/kelasModel.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const pelajarRouter = express.Router();
pelajarRouter.use(bodyParser.json()); // support json encoded bodies
pelajarRouter.use(bodyParser.urlencoded({ extended: true }));



//@desc add new user
//@route POST/api/user/add
pelajarRouter.get('/list', async (req, res) => {
    const h = await User.find();
    res.status(200).json(h);
});
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

pelajarRouter.post('/login', async(req,res)=>{

    const pelajar = await User.findOne({username : req.body.username})
    console.log(req.body.username)
    if (!pelajar) return res.status(400).json({ error: "Username is wrong ="+req.body.username })
      const validPassword = await bcrypt.compare(req.body.password, pelajar.password)
      if (!validPassword)
      return res.status(400).json({ error: "Password is wrong ="+req.body.username })
      const token = jwt.sign(
          // payload data
      {
          username: pelajar.username,
          id: pelajar._id,
          roles:0,
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

pelajarRouter.put('/update/:id', async (req,res) => {

    //header apabila akan melakukan akses
    var token = req.headers['auth-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
                const {nama, username, alamat, no_telp, email, tempat_lahir, tanggal_lahir, password} = req.body;
    
                const user = await User.findById(req.params.id);
            
                if (user) {
            
                    var saltRounds = 10;
                    const hashedPw = await bcrypt.hash(password, saltRounds);
                    user.nama = nama;
                    user.username = username;
                    user.alamat = alamat;
                    user.no_telp = no_telp;
                    user.email = email;
                    user.tempat_lahir = tempat_lahir;
                    user.tanggal_lahir = tanggal_lahir;
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
pelajarRouter.get('/logout', async(req,res)=>{
    const token = null
    res.status(200).send({ auth: false, token: token });
})
pelajarRouter.post('/kelas/register',async(req,res)=>{
    const {
      idenrol
    } = req.body;

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    const newPelajar = [verified.id];
    const follow = EnrolKelas.updateOne({_id:idenrol},{
      $push:{
        pelajar:newPelajar,
      }
    }).then((r)=>{
        const j = new PelajarJoined({
            idEnrolkelas:idenrol,
            pelajar:verified.id,
            status:true,
            feedbacks:[],
            mark:0,
        })
        const save = j.save();
        res.status(200).json('Success')


    })

})


export default pelajarRouter;
