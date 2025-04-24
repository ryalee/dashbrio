const axios = require('axios');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token ausente ou inválido.'})
  }

  const token = authHeader.split(' ')[1]

  try {
    const { data } = await axios.get(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: supabaseAnonKey,
      },
    })
    req.user = data
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.'})
  }
}

module.exports = verifyToken;