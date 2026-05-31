import 'dotenv/config'
import express from 'express'
import routes from './src/routes/index.route.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000
const adminKeyConfigured = Boolean(process.env.ADMIN_KEY && String(process.env.ADMIN_KEY).trim())

// middlewares
app.use(cors({
  origin: 'https://frontend-portfolio-theta-three.vercel.app', // 🔗 ໃສ່ URL ໜ້າບ້ານທີ່ໄດ້ຈາກ Vercel 
  credentials: true, // 👈 ບັງຄັບໃສ່ໃຫ້ຕົງກັບຝັ່ງ Frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));// ອະນຸຍາດໃຫ້ທຸກ Domain ເຂົ້າເຖິງໄດ້ (ສຳລັບ Development)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public')) // Serve static files from the 'public' directory

// routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, adminKeyConfigured })
})
app.use('/', routes)
app.listen(PORT, () => {
  if (!adminKeyConfigured) {
    console.warn('WARNING: ADMIN_KEY is not configured. Write routes will return 500.')
  }
  console.log(`Server is running on port ${PORT}`)
})
