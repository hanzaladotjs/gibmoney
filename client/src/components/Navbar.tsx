// hi
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {

  const [menu, setMenu] = useState<boolean>(false)

  function openMenu() {
    if(!menu){
      setMenu(true)
    } else{
      setMenu(false)
    }
  }
  return (
    <div className="flex flex-col ">
    <nav className="sticky flex md:justify-around  justify-between px-1 md:mx-0 text-gray-200 font-mono border-b bg-stone-800 opacity-40 py-4 border-gray-800">
      <div className="flex space-x-3 items-center">
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#ffffff"
        >
          <path
            d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11"
            stroke="#ffffff"
          ></path>
          <path
            d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
            stroke="#ffffff"
          ></path>
          <path
            d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13"
            stroke="#ffffff"
          ></path>
          <path
            d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21"
            stroke="#ffffff"
          ></path>
        </svg>
        <Link to="/">
          <div className="hover:text-gray-500 hover:underline"> gibmoney</div>
        </Link>
      </div>
    
      <div className="flex space-x-3 md:flex hidden ">
        <Link to="/signup">
          <div className="hover:text-gray-500 hover:underline"> signup</div>
        </Link>
        <Link to="/signin">
          <div className="hover:text-gray-500 hover:underline"> signin</div>
        </Link>
        <Link to="/send">
          <div className="hover:text-gray-500 hover:underline"> send</div>
        </Link>
      </div> 



      <button onClick={openMenu} className="md:hidden">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#ffffff"
          className="md:hidden"
        >
          <path
            d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
            stroke="#ffffff"
          ></path>
          <path d="M14 10H15.125H17" stroke="#ffffff"></path>
          <path
            d="M17 14L14.9167 14L12 14L10.3333 10H7"
            stroke="#ffffff"
          ></path>
        </svg>
      </button>

     
    </nav>
     {menu ? <button onClick={() => {
      setMenu(false)
     }}>
     <div className="flex flex-col  space-y-1 md:hidden italic my-0 items-end mr-1">
        
          <div className="text-gray-500 py-3 opacity-70 hover:bg-stone-600 hover:text-gray-900 border-b border-l w-25 text-center"><Link to="/signup" className="hover:bg-stone-600 "> <div>signup </div></Link></div>
        
       
          <div className="text-gray-500  py-3 opacity-70  hover:bg-stone-600 hover:text-gray-900 border-b w-25 border-l text-center">  <Link to="/signin" className="hover:bg-stone-600"> <div>signin </div></Link></div>
        
       
          <div className="text-gray-500  py-3 opacity-70  hover:bg-stone-600 hover:text-gray-900 border-b w-25 border-l text-center">  <Link to="/send" className="hover:bg-stone-600"> <div> send</div>  </Link></div>
        
      </div> </button>: null }
      
    </div>
  );
};

export default Navbar;
