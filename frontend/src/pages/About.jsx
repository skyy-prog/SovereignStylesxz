import React from 'react';
import Title from '../components/Title';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br universalfontgreatvibes from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            <Title title1={' About Sovereign Stylesxz'}/>
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Left Image */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-xl overflow-hidden transform -rotate-3">
                <img 
                  src="/Aboutpage.jpg" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-72 h-80 bg-gradient-to-tr from-slate-800 to-slate-600 rounded-lg shadow-xl overflow-hidden transform rotate-3 z-10">
                <img 
                  src="/Aboutpage4.jpg" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-3/5">
            <div className="space-y-6 text-slate-700">
              <p className="text-lg leading-relaxed">
                Welcome to <span className="font-semibold text-slate-900">Sovereign Style'sxz</span>, where fashion meets elegance, comfort meets craftsmanship, and every outfit becomes a statement of individuality. Our journey started with a bold vision—to redefine the online shopping experience by offering premium-quality clothing for men, women, and kids, all under one trusted brand.
              </p>
              
              <p className="text-lg leading-relaxed">
                At Sovereign Style'sxz, we believe that fashion is not just about trends; it is about expressing who you are with confidence, grace, and authenticity.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-amber-500">
                <p className="text-lg leading-relaxed italic">
                  Every product in our collection is carefully selected to ensure the highest standards of fabric quality, durability, design, and fit. Whether it's a refined men's outfit, modern women's wear, or adorable kids' collections, our catalog reflects a balance of style and comfort suitable for all occasions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
          {/* Right Image */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-bl from-amber-100 to-amber-50 rounded-lg shadow-xl overflow-hidden transform rotate-3">
                <img 
                  src="../public/Aboutpage2.jpg" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-72 h-80 bg-gradient-to-tl from-slate-800 to-slate-600 rounded-lg shadow-xl overflow-hidden transform -rotate-3 z-10">
                <img 
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                  alt="Kids collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-3/5">
            <div className="space-y-6 text-slate-700">
              <p className="text-lg leading-relaxed">
                We collaborate with reliable manufacturers and premium labels that share our commitment to excellence, ensuring that each piece feels as good as it looks.
              </p>
              
              <p className="text-lg leading-relaxed">
                At Sovereign Style'sxz, we constantly evolve with the ever-changing world of fashion. Our team keeps a close eye on global trends and introduces fresh arrivals, seasonal outfits, and exclusive designs throughout the year. We aim to make every shopping experience effortless and enjoyable by offering secure payment options, fast delivery, easy returns, transparent policies, and responsive customer support.
              </p>
            </div>
          </div>
        </div>

        {/* Final Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/5 p-8 lg:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6"> <Title title1={'Our Promise to You'}/></h2>
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  What truly sets us apart is our dedication to customer satisfaction. We take pride in building a brand you can trust—a brand that values quality, affordability, and authenticity. With every order you place, you become a part of the Sovereign Style'sxz family, a community that believes in dressing with purpose, confidence, and timeless charm.
                </p>
                
                <p className="text-xl  universalfontgreatvibes  leading-relaxed font-serif italic">
                  Sovereign Style'sxz isn't just a clothing store—it's a lifestyle, a promise of quality, and a celebration of fashion for everyone. Explore, express, and elevate your style with us.
                </p>
              </div>
            </div>
            
            <div className="lg:w-2/5 flex items-center justify-center p-8">
              <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-amber-500 to-amber-300 rounded-xl shadow-xl overflow-hidden">
                <img 
                  src="../public/logoo-removebg-preview.png" 
                  className="w-full h-full object-contain p-10"
                />
              </div>
            </div>
          </div>
        </div>
 
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Quality Craftsmanship</h3>
            <p className="text-slate-600">Every piece is carefully selected for premium fabric, durability, and perfect fit.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Customer First</h3>
            <p className="text-slate-600">We prioritize your satisfaction with responsive support and transparent policies.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Fashion Forward</h3>
            <p className="text-slate-600">Constantly evolving with global trends to bring you fresh, exclusive designs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;