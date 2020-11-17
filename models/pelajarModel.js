import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true
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
      required: true
    }
  },
  {
    timestamps: true,
  }
)

const Pelajar = mongoose.model('Pelajar', userSchema)

export default Pelajar