import User from '../models/kelasModel.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const kelasRouter = express.Router();

//@desc add new user
//@route POST/api/user/add
kelasRouter.post('/add', async (req, res) => {
  try{
      const{
          author,
          tanggal,
          sesi,
          topik,
          detail_topik,
          kapasitas
      } = req.body;

      const newUser = new User({
          "author": author,
          "tanggal":tanggal,
          "sesi":sesi,
          "topik": topik,
          "detail_topik": detail_topik,
          "kapasitas": kapasitas
      });


      const createdUser = await newUser.save();
      res.status(200).json(createdUser);

  }
  catch(error){
      res.status(500).json({ error: error})
  }
})

kelasRouter.put('/update/:id', async (req,res) => {
                const {author, tanggal, sesi, topik, detail_topik, kapasitas} = req.body;
    
                const user = await User.findById(req.params.id);
            
                if (user) {
                    user.author = author;
                    user.tanggal = tanggal;
                    user.sesi = sesi;
                    user.topik = topik;
                    user.detail_topik = detail_topik;
                    user.kapasitas = kapasitas;
            
                    const updateDatauser = await user.save()
            
                    res.send(updateDatauser);
                } else {
                    res.status(404).json({
                        message: 'Kelas not found'
                    })
            }
        })

export default kelasRouter