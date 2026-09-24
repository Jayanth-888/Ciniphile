"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Film, Utensils, Ticket, ShoppingBag, Search, MapPin, Clock, Star, ChevronRight } from 'lucide-react'

const Land = () => {
  const [activeTab, setActiveTab] = useState('movies')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

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

  // 🔹 Handle Book Button Click (Programmatic Redirect)
 const handleBookMovie = (movie) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("selectedMovie", JSON.stringify(movie));
    window.location.href = "/book";  // 🔹 navigate to Book page directly
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AllInOne
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Bengaluru</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Any thing at Anytime
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need in one place
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for movies, restaurants, or cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-900 bg-white shadow-lg"
          />
        </div>

        {/* Tabs */}
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

        {/* Movies Section */}
        {activeTab === 'movies' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Now Showing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                  <div className="relative h-80 overflow-hidden">
                    <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full flex items-center space-x-1">
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

        {/* Food Section */}
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
      </main>

      <footer className="bg-white mt-16 py-8 border-t text-center text-gray-600">
        <p>© 2025 AllInOne. Your one-stop platform for entertainment and food.</p>
      </footer>
    </div>
  )
}

export default Land
