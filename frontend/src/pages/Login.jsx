import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { IoIosEye } from "react-icons/io";
import { FaEyeLowVision } from "react-icons/fa6";
import { useContext } from "react";
import { Shopcontext } from "../context/shopcontext";
import toast , {Toaster} from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [currentstate, setcurrentstate] = useState("Login");
  const [showeye ,setshoweye] = useState(false);
  const {token , setokens ,     BACKEND_URL ,  setcommentname } = useContext(Shopcontext);
  const [email  , setemail] = useState('');
  const [password, setpassword]= useState('');
  const [name , setname] = useState('')
  const navigate = useNavigate();
  const handletopreventandcontrolthesubmitfunction = async(e)=>{
    e.preventDefault();
    console.log(email , password , name);
   if(currentstate === 'Sign up'){
    handletocreatepassword();
    try {
      const response = await axios.post(BACKEND_URL+ '/api/user/register/'  ,{name , password , email})
      if(response.data.success){
        setokens(response.data.token);
        localStorage.setItem('token',response.data.token)
        setname("")
        console.log(token);
        localStorage.setItem('name' ,  response.data.name)
        toast.success("Signed UP successfully");
        
      }else{
        console.log(response.data.msg)
        toast.success("Failed to Sign up")

      }
    } catch (error) {
      console.log(error)
    }
   }else if(currentstate ===  'Login'){
    try {
      const reponseLogin = await axios.post(BACKEND_URL+'/api/user/userlogin/',{email, password});
        if(reponseLogin.data.success){
        console.log(reponseLogin.data)
         setokens(reponseLogin.data.token);
        localStorage.setItem('token',reponseLogin.data.token)
        localStorage.setItem('name' ,  reponseLogin.data.username)
        console.log(reponseLogin.data.username);

      }else{
        console.log(reponseLogin.data.msg)
        toast.error(reponseLogin.data.msg+'  please register')
      }
    } catch (error) {
       console.log(error)
    }
   }
  }
    
     const handletocreatepassword = async()=>{
try {
 if(!name){  
   toast.error('Enter the name first to get password')
 }
   const Loginresponse = await axios.post(BACKEND_URL + '/api/ai/logingeneration' , {name})
   if(Loginresponse.data.success){
  setpassword(Loginresponse.data.password);
   }
       
} catch (error) {
  console.log(error.message)
}
    }
  useEffect(()=>{
 if(token){
     navigate('/')
        }
  },[token])
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={10}
          containerClassName=""
          containerStyle={{}} 
          toasterId="default"
          toastOptions={{
            // Define default options
            className: '',
            duration: 3000,
            removeDelay: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },
        
            // Default options for specific types
            success: { 
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
        <div className="w-full flex items-center justify-center p-3">
          <Title title1={currentstate === "Login" ? "Login/" : "Sign Up/"} />
        </div>

        <form onSubmit={handletopreventandcontrolthesubmitfunction} className="flex flex-col gap-5 w-full max-w-lg px-5 justify-around items-center">
          {currentstate !== "Login" && (
            <input
              className="w-full p-4 border-2 border-black"
              type="text"
             value={name}
             onChange={(e)=>setname(e.target.value)}
              placeholder="User Name..."
              required
            />
          )}

          <input
            className="w-full p-4 border-2 border-black"
            type="email"
                value={email}
              onChange={(e)=>setemail(e.target.value)}
            placeholder="User Email..."
            required
          />

          <input
            className="w-full p-4 border-2 border-black"
            type= {showeye ? 'text':'password'}
            placeholder="User Password..."
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            required
          />
          {currentstate === 'Sign up' ?  <button  className=" bg-black p-3 rounded-2xl w-full  universalQuicksand text-white  cursor-pointer" onClick={handletocreatepassword}>Get AI password</button> : ''}
       {showeye ? <IoIosEye  size={30} className=" cursor-pointer " onClick={()=>setshoweye(!showeye)}/>: <FaEyeLowVision  size={30} className=" cursor-pointer" onClick={()=>setshoweye(!showeye)}/>}

          <button
            type="button"
            onClick={() =>
              setcurrentstate(currentstate === "Login" ? "Sign up" : "Login")
            }
            className="w-full text-black cursor-pointer universalfontquicksand font-bold"
          >
            {currentstate === "Login"
              ? "Create Account"
              : "Already have an account?"}
          </button>

          <button
            type="submit"
            className="w-full text-white p-4 rounded-2xl cursor-pointer universalfontquicksand font-bold bg-black"
          >
            {currentstate === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
