"use client"
import React, { useState } from 'react'
import { Film, Utensils, Ticket, ShoppingBag, Search, MapPin, Clock, Star, ChevronRight, ArrowLeft, Calendar, User, CreditCard, Check, Home } from 'lucide-react'

const CombinedApp = () => {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [activeTab, setActiveTab] = useState('movies')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTheater, setSelectedTheater] = useState(null)

  const movies = [
    { id: 1, title: 'Dune: Part Two', genre: 'Sci-Fi', rating: 4.5, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop', price: 250 },
    { id: 2, title: 'The Holdovers', genre: 'Drama', rating: 4.3, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop', price: 200 },
    { id: 3, title: 'Oppenheimer', genre: 'Biography', rating: 4.8, image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop', price: 300 },
    { id: 4, title: 'Poor Things', genre: 'Fantasy', rating: 4.2, image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop', price: 250 },
  ]

  const restaurants = [
    { 
      id: 1, 
      name: 'Pizza Paradise', 
      cuisine: 'Italian', 
      rating: 4.4, 
      time: '30-40 min', 
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', 
      offer: '50% off',
      link: 'https://www.zomato.com/bangalore/pizza-paradise/order'
    },
    { 
      id: 2, 
      name: 'Burger Bliss', 
      cuisine: 'American', 
      rating: 4.2, 
      time: '25-35 min', 
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', 
      offer: 'Free delivery',
      link: 'https://www.zomato.com/bangalore/burger-bliss-malleshwaram-bangalore/order'
    },
    { 
      id: 3, 
      name: 'Sushi Station', 
      cuisine: 'Japanese', 
      rating: 4.6, 
      time: '40-50 min', 
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop', 
      offer: '₹100 off',
      link: 'https://www.zomato.com/bangalore/sushi-station/order'
    },
    { 
      id: 4, 
      name: 'Curry House', 
      cuisine: 'Indian', 
      rating: 4.5, 
      time: '35-45 min', 
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', 
      offer: '40% off',
      link: 'https://www.zomato.com/bangalore/curry-house/order'
    },
  ]

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

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const seatsPerRow = 12
  const bookedSeats = ['A5', 'A6', 'B7', 'C4', 'C5', 'D8', 'E3', 'F9', 'F10']

  const handleBookMovie = (movie) => {
    setSelectedMovie(movie)
    setCurrentPage('booking')
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedSeats([])
    setSelectedTheater(null)
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
    setSelectedMovie(null)
  }

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const getSeatPrice = (row) => {
    if (['A', 'B', 'C'].includes(row)) return 150
    if (['D', 'E', 'F', 'G'].includes(row)) return 200
    return 250
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    return sum + getSeatPrice(seat[0])
  }, 0)

  const handleProceed = () => {
    if (selectedDate && selectedTime && selectedSeats.length > 0 && selectedTheater) {
      alert(`Booking Confirmed!\nMovie: ${selectedMovie?.title || 'Movie'}\nTheater: ${selectedTheater.name}\nDate: ${selectedDate.day}, ${selectedDate.date} ${selectedDate.month}\nTime: ${selectedTime}\nSeats: ${selectedSeats.join(', ')}\nTotal: ₹${totalPrice}`)
      handleBackToHome()
    } else {
      alert('Please select date, time, theater and seats to proceed')
    }
  }

  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CINIPHILE
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Bengaluru</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Book Movies & Order Food</h2>
            <p className="text-lg text-gray-600">Everything you need in one place</p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for movies, restaurants, or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-900 bg-white shadow-lg"
              />
            </div>
          </div>

          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setActiveTab('movies')}
              className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === 'movies'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Film className="w-5 h-5" />
              <span>Movies</span>
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === 'food'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Utensils className="w-5 h-5" />
              <span>Food</span>
            </button>
          </div>

          {activeTab === 'movies' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Now Showing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <div key={movie.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                    <div className="relative h-80 overflow-hidden">
                      <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm font-semibold">{movie.rating}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{movie.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{movie.genre}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-600 font-bold">₹{movie.price}</span>
                        <button 
                          onClick={() => handleBookMovie(movie)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-1"
                        >
                          <Ticket className="w-4 h-4" />
                          <span>Book</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'food' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Restaurants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {restaurants.map((restaurant) => (
                  <div key={restaurant.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {restaurant.offer}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{restaurant.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-green-600 fill-green-600" />
                          <span className="font-semibold">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{restaurant.time}</span>
                        </div>
                      </div>
                      <a
                        href={restaurant.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-1"
                      >
                        <span>Order Now</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="bg-white mt-16 py-8 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            <p>© 2025 AllInOne. Your one-stop platform for entertainment and food.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={handleBackToHome} className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">{selectedMovie?.title || 'Book Tickets'}</h1>
            <button onClick={handleBackToHome} className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors px-4 py-2 rounded-lg hover:bg-purple-50">
              <Home className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {selectedDate && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-purple-600" />
              <span>Select Theater & Show Time</span>
            </h2>
            <div className="space-y-4">
              {theaters.map((theater) => (
                <div key={theater.id} className="bg-white rounded-xl p-6 shadow-lg">
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

        {selectedTime && selectedTheater && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <User className="w-6 h-6 text-purple-600" />
              <span>Select Seats</span>
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="mb-8">
                <div className="bg-gradient-to-b from-gray-200 to-gray-100 rounded-t-full h-3 mb-2"></div>
                <p className="text-center text-gray-600 text-sm font-semibold">SCREEN</p>
              </div>

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

export default CombinedApp