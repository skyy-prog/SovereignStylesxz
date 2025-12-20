import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
     <>
      <div className=' flex justify-around items-center flex-col gap-3 p-3'>
       <div className=' flex justify-around items-center flex-row gap-3 p-3  border-b w-full border-b-amber-800  '>
          <div className="first flex">
              <span className="hidden universalfontgreatvibes md:inline text-2xl font-bold bg-gradient-to-tr from-[#ffd900] to-black bg-clip-text text-transparent">
  Sovereign Style'sxz...
</span> 
<img src="/logoo-removebg-preview.png"
                alt="Logo"/>
        </div>
        <div className='universalfontquicksand'>
            <h1 className=' text-2xl font-bold  mb-5'>Company</h1>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li><Link to={'/'}>Home</Link></li>
                <li>Privacy</li>
                <li> <Link to={'/Services'}>Privacy Policy</Link></li>
                <li>Delivary</li>
            </ul>
        </div>
       </div>
       <div className='  w-full text-center universalfontquicksand'>© 2025 Sovereign Style’s – Preserving Royal Craftsmanship.</div>
       <div className='  w-full text-center universalfontquicksand'>Developer: <a href="https://github.com/skyy-prog" >go to Github</a></div>
       <div className='  w-full text-center universalfontquicksand'>Developer: <a  href="https://www.instagram.com/iskyyprajapatii" >go to Instagram</a></div>
      </div>
     </>
  )
}

export default Footer