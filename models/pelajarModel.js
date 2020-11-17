import mongoose from 'mongoose'

const pelajarSchema = mongoose.Schema(
  {
    id_pelajar: {
      type: String,
      required: true,
    },
    nama_pelajar: {
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
    wilayah: {
      type: String,
      required:true
    },
    tempat_lahir: {
      type: String,
      required:true
    },
    tanggal_lahir: {
      type: Date,
      required:true
    },
  },
  {
    timestamps: true,
  }
)

const Pelajar = mongoose.model('Pelajar', pelajarSchema)

export default Pelajar