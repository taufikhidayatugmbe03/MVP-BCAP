import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

const memberRouter = express.Router();

memberRouter.use(bodyParser.json()); // support json encoded bodies
memberRouter.use(bodyParser.urlencoded({ extended: true }));

memberRouter.get('/me', async (req, res) => {
  try{
       const profilUser = {
          nama:null
       };
       res.status(200).json(profilUser);

  }
  catch(error){
      res.status(500).json({ error: error})
  }
})



export default memberRouter;
