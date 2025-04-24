const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { createClient } = require('@supabase/supabase-js')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

app.get('/ping', (req, res) => {
  res.json({ message: 'pong 🏓' })
})

app.listen(port, () => {
  console.log(`🔥 Dashbrio backend rodando em http://localhost:${port}`)
})
