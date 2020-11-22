import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const kelasSchema = mongoose.Schema(
  {
    jenis:{
      type:Number,
      required:true,
    },
    judul: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    kapasitas: {
      type: String,
      required: true,
    },
    authors: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pengajar"
    },
    topics:[],
    likes:[],
    comments:[]

  },
  {
    timestamps: true,
  }
)
const enroleKelas = mongoose.Schema(
  {
    kelas:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kelas"
    },
    tanggal:{type:Date,required:true},
    pelajar:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"PelajarJoined"
    }],
    status:Number
  }
);
const pelajarJoined = mongoose.Schema({
  idEnrolkelas:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"EnrolKelas",
  },
  pelajar:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Pelajar",
  }],
  status:Boolean,
  feedbacks:[],
  mark:Number,
})
const kategoriKelas = mongoose.Schema({
   kategori:String,
})


const Kelas = mongoose.model('Kelas', kelasSchema)
const EnrolKelas = mongoose.model('EnrolKelas',enroleKelas);
const PelajarJoined = mongoose.model('PelajarJoined',pelajarJoined);
const KategoriKelas = mongoose.model('Kategori',kategoriKelas);

export {
 Kelas,
 EnrolKelas,
 PelajarJoined,
 KategoriKelas
}
