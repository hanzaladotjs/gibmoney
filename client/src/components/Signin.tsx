import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const navigate = useNavigate()
  const backend_Uri = import.meta.env.VITE_BACKEND_URI

  type UserSignin = {
    username: string
    password: string
  }

  const [sigin, setSignin] = useState<UserSignin>({
    username: "",
    password: ""
  }) 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
     e.preventDefault()

    const response = await fetch(`${backend_Uri}/user/sigin`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sigin)
    })
const data = await response.json()

    const token = data.token 

    await localStorage.setItem("jwt", token)

    setSignin({
      username: "",
      password: ""
    })

    navigate("/send")

  }
  
    return (
      <div className="flex flex-col justify-center items-center font-mono border border-gray-600 text-gray-400 bg-stone-900 hover:border-gray-500 md:py-25 py-16 px-10 md:px-25 mx-3 rounded-3xl">
        <h1 className="md:text-4xl text-2xl mb-10 text-center"> happy to see 
          <br></br>you back ser! </h1>
        <form onSubmit={handleSubmit} className="flex flex-col   space-y-4 justify-center">
          <div className="space-y-1">
            <h1 className="italic hover:text-blue-500"> username</h1>
            <input type="text" value={sigin.username} onChange={(e) => setSignin((prev) => ({...prev, username: e.target.value}))} className="border border-gray-500 rounded md:h-8" />
          </div>

  
          <div className="space-y-1">
            <h1 className="italic hover:text-pink-500">password</h1>
            <input type="text" value={sigin.password} onChange={(e)=> setSignin((prev)=> ({...prev, password: e.target.value}))}  className="border border-gray-500 rounded md:h-8" />
          </div>
          <div className="flex justify-center mt-2 ">
            <button type="submit" className="border border-gray-500 px-3 py-1 hover:bg-black rounded-md hover:border-gray-300 ">signin</button>
          </div>
        
        </form>
      </div>
    );
  };
  
  export default Signin;
  