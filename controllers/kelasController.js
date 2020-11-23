import { Kelas,EnrolKelas,PelajarJoined} from '../models/kelasModel.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const kelasRouter = express.Router();

//@desc add new user
//@route POST/api/user/add
//@
kelasRouter.use(bodyParser.json()); // support json encoded bodies
kelasRouter.use(bodyParser.urlencoded({ extended: true }));

kelasRouter.get('/decode',async(req,res)=>{
      const token = req.header('auth-token');
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log(verified);

});
kelasRouter.post('/store', async (req, res) => {
      const token = req.header('auth-token');
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

      const{
          jenis,
          judul,
          deskripsi,
          kapasitas,
          image,
      } = req.body;

      const kelasData = new Kelas({
           "jenis": jenis,
           "judul": judul,
          "deskripsi": deskripsi,
          "kapasitas": kapasitas,
          "image":image,
          "topics":[],
          "comments":[],
          "likes":[],
      });
      const createdKelas = await kelasData.save().then((r)=>{
          const authors = {
            "authors":verified.id, //idpengajar
          };
         Kelas.updateOne({_id:r._id},authors).then((e,r)=>{
           console.log(e);
         });
         res.status(200).json(r);



      });



})
kelasRouter.get('/list',async(req,res)=>{

       //Kelas.collection.drop();
       const h = await  Kelas.find().populate({path:'authors',select:['nama','alamat']});
       res.status(200).json(h);


})
kelasRouter.get('/kelas-saya',async(req,res)=>{

       //Kelas.collection.drop();
       const token = req.header('auth-token');
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

       const h = await  Kelas.find({authors:verified.id}).populate({path:'authors',select:['nama','alamat']});
       res.status(200).json(h);


})
kelasRouter.get('/show/:id',async(req,res)=>{
    try{
      const h = await  Kelas.findOne({_id:req.params.id}).populate('authors')
      .then(dd=>{
        res.status(200).json(dd);
      })

    }catch(error){
        res.status(500).json({ error: error})
    }
})
kelasRouter.put('/update/:id',async(req,res)=>{
    try{
      const{
          judul,
          jenis,
          deskripsi,
          kapasitas,
          topics,
          image,
      } = req.body;
      const kelasData ={
          "jenis": jenis,
          "judul": judul,
          "deskripsi": deskripsi,
          "kapasitas": kapasitas,
          "image":image,
          "topics":topics,
       };
      const h = await Kelas.updateOne({_id:req.params.id},kelasData)
      .then((e)=>{
        res.status(200).json('Success');
      })



    }catch(error){
        res.status(500).json({ error: error})
    }
})
kelasRouter.post('/aktiv',async(req,res)=>{
    const{
      idkelas,
    } = req.body;
    const En = new EnrolKelas({
      kelas:idkelas,
      tanggal:'2020-01-01',
      pelajar:[],
      status:1, //1 aktiv,2 berlangsung , 3 selesai
    })
    const ins = await En.save();
    res.status(200).json(ins);

})
kelasRouter.post('/start',async(req,res)=>{
    const{
      idenrol,
    } = req.body;
    const En = {
        status:2, //1 aktiv,2 berlangsung , 3 selesai
    }
    const ins = await EnrolKelas.updateOne({_id:idenrol},En);
    res.status(200).json(ins);

})
kelasRouter.post('/done',async(req,res)=>{
    const{
      idenrol,
    } = req.body;
    const En = {
        status:3, //1 aktiv,2 berlangsung , 3 selesai
    }
    const ins = await EnrolKelas.updateOne({_id:idenrol},En);
    res.status(200).json(ins);

})
kelasRouter.post('/hold',async(req,res)=>{
    const{
      idenrol,
    } = req.body;
    const En = {
        status:4, //1 aktiv,2 berlangsung , 3 selesai,4 hold
    }
    const ins = await EnrolKelas.updateOne({_id:idenrol},En);
    res.status(200).json(ins);

})
kelasRouter.get('/enrolList',async(req,res)=>{

    const ins = await EnrolKelas.find().populate('kelas');
    res.status(200).json(ins);

})
kelasRouter.get('/reset',async(req,res)=>{
    try{
      Kelas.collection.drop();
      PelajarJoined.collection.drop();
      EnrolKelas.collection.drop();
      res.status(200).json('true');
    }
    catch(e){
      console.log(e)
    }


})

export default kelasRouter
