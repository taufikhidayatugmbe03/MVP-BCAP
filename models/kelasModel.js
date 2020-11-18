import mongoose from 'mongoose'

const kelasSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true
    },
    tanggal: {
      type: String,
      required: true,
    },
    sesi: {
      type: String,
      required: true,
    },
    topik: {
      type: String,
      required: true,
    },
    detail_topik: {
      type: String,
      required: true,
    },
    kapasitas: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Kelas = mongoose.model('Kelas', kelasSchema)

export default Kelas