
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// In-memory DB
const checkins = []

app.post('/api/checkin', (req, res) => {
  const { mood } = req.body
  const timestamp = new Date()
  checkins.push({ mood, timestamp })
  res.sendStatus(200)
})

app.get('/api/summary', (req, res) => {
  const last7Days = checkins.slice(-7)
  const burnoutScore = last7Days.reduce((score, entry) => {
    if (entry.mood === 'burned') return score + 3
    if (entry.mood === 'stressed') return score + 2
    if (entry.mood === 'neutral') return score + 1
    return score
  }, 0)

  res.json({
    days: last7Days,
    burnoutScore,
    message:
      burnoutScore > 12
        ? '🚨 High Risk of Burnout'
        : burnoutScore > 6
        ? '⚠️ Moderate Risk'
        : '✅ Healthy',
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
