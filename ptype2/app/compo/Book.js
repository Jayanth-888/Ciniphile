"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, MapPin, User, CreditCard, Check, Home } from 'lucide-react'

const Book = () => {
  const router = useRouter()
  const [movie, setMovie] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTheater, setSelectedTheater] = useState(null)

  // Retrieve movie data from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const movieData = sessionStorage.getItem('selectedMovie')
      if (movieData) {
        setMovie(JSON.parse(movieData))
      }
    }
  }, [])

  // Sample dates (next 5 days)
  const dates = []
  for (let i = 0; i < 5; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    dates.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: date.toISOString().split('T')[0]
    })
  }

  const theaters = [
    { id: 1, name: 'PVR Cinemas', location: 'Orion Mall', times: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'] },
    { id: 2, name: 'INOX', location: 'Forum Mall', times: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'] },
    { id: 3, name: 'Cinepolis', location: 'Phoenix Market', times: ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'] }
  ]

  // Seat layout (10 rows x 12 seats)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const seatsPerRow = 12
  
  // Randomly mark some seats as booked
  const bookedSeats = ['A5', 'A6', 'B7', 'C4', 'C5', 'D8', 'E3', 'F9', 'F10']

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const getSeatPrice = (row) => {
    if (['A', 'B', 'C'].includes(row)) return 150 // Front seats
    if (['D', 'E', 'F', 'G'].includes(row)) return 200 // Middle seats
    return 250 // Premium seats
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    return sum + getSeatPrice(seat[0])
  }, 0)

  const handleProceed = () => {
    if (selectedDate && selectedTime && selectedSeats.length > 0 && selectedTheater) {
      alert(`Booking Confirmed!\nMovie: ${movie?.title || 'Movie'}\nTheater: ${selectedTheater.name}\nDate: ${selectedDate.day}, ${selectedDate.date} ${selectedDate.month}\nTime: ${selectedTime}\nSeats: ${selectedSeats.join(', ')}\nTotal: ₹${totalPrice}`)
      // Navigate back to home after booking
      router.push('/')
    } else {
      alert('Please select date, time, theater and seats to proceed')
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  // NEW: Handle home navigation
  const handleHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              {movie?.title || 'Book Tickets'}
            </h1>
            {/* NEW: Home button added */}
            <button
              onClick={handleHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors px-4 py-2 rounded-lg hover:bg-purple-50"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Select Date */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            <span>Select Date</span>
          </h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 px-6 py-4 rounded-xl border-2 transition-all ${
                  selectedDate?.fullDate === date.fullDate
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-semibold">{date.day}</div>
                  <div className="text-2xl font-bold">{date.date}</div>
                  <div className="text-xs">{date.month}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Select Theater & Time */}
        {selectedDate && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-purple-600" />
              <span>Select Theater & Show Time</span>
            </h2>
            <div className="space-y-4">
              {theaters.map((theater) => (
                <div
                  key={theater.id}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{theater.name}</h3>
                    <p className="text-sm text-gray-600">{theater.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {theater.times.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedTime(time)
                          setSelectedTheater(theater)
                        }}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedTime === time && selectedTheater?.id === theater.id
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Select Seats */}
        {selectedTime && selectedTheater && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <User className="w-6 h-6 text-purple-600" />
              <span>Select Seats</span>
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {/* Screen */}
              <div className="mb-8">
                <div className="bg-gradient-to-b from-gray-200 to-gray-100 rounded-t-full h-3 mb-2"></div>
                <p className="text-center text-gray-600 text-sm font-semibold">SCREEN</p>
              </div>

              {/* Seat Legend */}
              <div className="flex justify-center space-x-6 mb-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>

              {/* Seats Grid */}
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  {rows.map((row) => (
                    <div key={row} className="flex items-center justify-center mb-2">
                      <div className="w-8 text-center font-semibold text-gray-600">{row}</div>
                      <div className="flex space-x-2">
                        {[...Array(seatsPerRow)].map((_, index) => {
                          const seatId = `${row}${index + 1}`
                          const isBooked = bookedSeats.includes(seatId)
                          const isSelected = selectedSeats.includes(seatId)
                          
                          return (
                            <button
                              key={seatId}
                              onClick={() => toggleSeat(seatId)}
                              disabled={isBooked}
                              className={`w-8 h-8 rounded text-xs font-semibold transition-all ${
                                isBooked
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-110'
                                  : 'bg-gray-200 hover:bg-gray-300'
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4 mx-auto" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="text-gray-600">Front (A-C)</p>
                    <p className="font-bold text-gray-900">₹150</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Middle (D-G)</p>
                    <p className="font-bold text-gray-900">₹200</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Premium (H-J)</p>
                    <p className="font-bold text-gray-900">₹250</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <div className="sticky bottom-0 bg-white rounded-t-2xl shadow-2xl p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} Selected
                  </p>
                  <p className="text-xs text-gray-500">{selectedSeats.join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-3xl font-bold text-purple-600">₹{totalPrice}</p>
                </div>
              </div>
              <button
                onClick={handleProceed}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Payment</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Book