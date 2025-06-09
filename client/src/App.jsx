
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [mood, setMood] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!mood) return alert('Please select your mood!')
    await axios.post('http://localhost:5000/api/checkin', { mood })
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Mood Check-In</h1>
      {submitted ? (
        <p className="text-green-600">Thanks for checking in!</p>
      ) : (
        <>
          <select
            className="p-2 rounded shadow"
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">Select mood</option>
            <option value="happy">😊 Happy</option>
            <option value="neutral">😐 Neutral</option>
            <option value="stressed">😫 Stressed</option>
            <option value="burned">🔥 Burned Out</option>
          </select>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </>
      )}
    </div>
  )
}

export default App
#just a dummy change
#Dinuka
