import mongoose from 'mongoose'

const pengajarSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    no_telp: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tempat_lahir: {
      type: String,
      required:true
    },
    tanggal_lahir: {
      type: Date,
      required:true
    },
    password: {
      type: String,
      required: true,
    },
    keahlian: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
)

const Pengajar = mongoose.model('Pengajar', pengajarSchema)

export default Pengajar
