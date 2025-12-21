import React from 'react'


const Navbar = ({setToken}) => {
    const handletlogout = ()=>{
        const comfirm = confirm('Are u sure u want to Logout ??')
        if(comfirm){
            setToken('')
        }

    }
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-xl shadow-lg border-b border-white/20">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-4">
         
        <h1 className="hidden md:inline text-2xl font-bold bg-gradient-to-tr from-[#ffd900] to-black bg-clip-text text-transparent tracking-tight">
          Sovereign Style'sxz — Admin Panel  
        </h1>
      </div>

      {/* Right: Logout */}
      <div className="flex items-center gap-4">
       <button
  onClick={handletlogout}
  className="
    px-5 py-2 cursor-pointer rounded-xl 
    border border-gray-300 
    text-gray-800 font-semibold 
    bg-white 
    shadow-sm 
    hover:shadow-md 
    hover:bg-gray-100 
    transition-all duration-200
  "
>
  Logout
</button>

      </div>
    </header>
  )
}

export default Navbar;
