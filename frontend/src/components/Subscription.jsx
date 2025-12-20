import React, { useState } from 'react'

const Subscribe = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please fill out this field.')
      return
    }
    // Handle subscription logic here
    
    setError('')
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12 ">
          <h1 className="text-5xl font-light tracking-tight mb-6">
           Become a Sovereign Insider
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto  w-full">
            Your Email is  <span className='font-bold'>protacted</span> and your  privacy is our first  <span className=' font-extrabold '>priority</span> so ,chill
          </p>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="Enter your email"
              className="w-full px-6 py-4 text-lg border-b-2 border-gray-300 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300"
            />
            {error && (
              <p className="text-sm text-gray-500 mt-2 absolute left-0 -bottom-6">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-black text-white text-lg font-medium tracking-wider hover:bg-gray-900 transition-all duration-300 relative group overflow-hidden"
          >
            <span className="relative z-10 cursor-pointer">SUBSCRIBE</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
          </button>
        </form>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="flex justify-center space-x-4 mb-6">
            {[1, 2, 3].map((dot) => (
              <div key={dot} className="w-1 h-1 bg-black rounded-full"></div>
            ))}
          </div>
          <p className="text-sm text-gray-500 tracking-wide">
            NO SPAM • UNSUBSCRIBE ANYTIME • PRIVACY PROTECTED
          </p>
        </div>
      </div>
    </div>
  )
}

export default Subscribe