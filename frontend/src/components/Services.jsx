import React from 'react'

const Services = () => {
  const policies = [
    {
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy"
    },
    {
      title: "7 Days Return Policy", 
      description: "We provide 7 days free return policy"
    },
    {
      title: "Best Customer Support",
      description: "We provide 24/7 customer support"
    }
  ]

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Modern Header */}
        <div className="text-center mb-20">
             <div className="relative mb-6">
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
<img src={'./public/logoo-removebg-preview.png'} alt="" />
  </div>
          <h1 className="text-6xl font-light services tracking-wide mb-4">
            OUR POLICIES
          </h1>
          <div className="w-32 h-0.5 bg-black mx-auto"></div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {policies.map((policy, index) => (
            <div key={index} className="group">
              {/* Title with accent line */}
              <div className="flex items-start mb-6">
                <div className="w-8 h-0.5 bg-black mt-3 mr-4 group-hover:w-12 transition-all duration-500"></div>
                <h2 className="text-2xl font-medium tracking-tight leading-tight">
                  {policy.title}
                </h2>
              </div>
              
              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed pl-12">
                {policy.description}
              </p>
              
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-20">
          <div className="flex space-x-2">
            {[1, 2, 3].map((dot) => (
              <div key={dot} className="w-2 h-2 bg-black rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services