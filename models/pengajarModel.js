import mongoose from 'mongoose'

const pengajarSchema = mongoose.Schema(
  {
    id_guru: {
      type: String,
      required: true,
    },
    nama_guru: {
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
    deskripsi: {
      type: String,
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
    tarif_mengajar: {
      type: String,
      required:true
    },
    deskripsi_available: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true,
  }
)

const Pengajar = mongoose.model('Pengajar', pengajarSchema)

export default Pengajar