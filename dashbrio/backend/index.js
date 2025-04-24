const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { createClient } = require('@supabase/supabase-js')

const verifyToken = require('./middlewares/auth')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

app.get('/ping', (req, res) => {
  res.json({ message: 'pong 🏓' })
})

app.get('/perfil', verifyToken, (req, res) => {
  res.json({
    message: 'Autenticado com sucesso',
    user: req.user,
  })
})

app.listen(port, () => {
  console.log(`🔥 Dashbrio backend rodando em http://localhost:${port}`)
})
