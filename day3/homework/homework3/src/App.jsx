import React from 'react'

function App() {
  const cards = [
    { title: 'Landscape', detail: '423km', bg: 'bg-yellow-50', icon: '...' },
    { title: 'Falset Mountains', detail: '423km, 3 Week', bg: 'bg-white', icon: '🌤️' },
    { title: 'Great day to schedule', detail: 'Lorem ipsum dolor sit amet.', bg: 'bg-white', icon: '🎬', btn: 'bg-purple-500' },
    { title: '', detail: '', bg: 'bg-white', icons: ['🌤️', '🌤️', '🌤️', '🌤️', '🌤️'], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    { title: 'Seattle', detail: 'Cloudy', bg: 'bg-red-500', temp: '32°', icon: '☁️', color: 'text-white' },
    { title: 'Great day to schedule', detail: 'Your usual hours', bg: 'bg-white', icon: '...' },
    { title: '', detail: '', bg: 'bg-white', icons: ['☀️', '☀️', '🌧️', '☀️', '☀️'], times: ['06:00 AM', '06:00 AM', '07:30 PM', '06:00 AM', '06:00 AM'], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    { title: 'Jul 02', detail: '', bg: 'bg-white', date: 'Wednesday', time: '11:30 PM - 18:30 PM' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col gap-4 max-w-2xl mx-auto">
      {cards.map((card, index) => (
        <div key={index} className={`p-4 rounded-lg shadow ${card.bg} flex items-center justify-between ${card.color || ''}`}>
          {card.title && <div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-gray-600">{card.detail}</p>
          </div>}
          {card.days && <div className="flex gap-2">
            {card.days.map((day, i) => (
              <div key={i} className="text-center">
                <p className="text-sm">{day}</p>
                {card.times ? <p className="text-sm">{card.times[i]}</p> : null}
                <span className="text-2xl">{card.icons[i]}</span>
              </div>
            ))}
          </div>}
          {card.temp && <div>
            <p className="text-2xl">{card.temp}</p>
            <span className="text-2xl">{card.icon}</span>
          </div>}
          {card.date && <div>
            <p className="text-lg font-semibold">{card.date}</p>
            <p className="text-gray-600">{card.time}</p>
          </div>}
          {card.icon && <div className={`text-2xl ${card.btn ? 'bg-' + card.btn + ' text-white rounded-full w-10 h-10 flex items-center justify-center' : ''}`}>{card.icon}</div>}
        </div>
      ))}
    </div>
  )
}

export default App