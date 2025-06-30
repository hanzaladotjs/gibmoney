import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";

const Signup = () => {

  const navigate = useNavigate()
  const backend_Uri = import.meta.env.VITE_BACKEND_URI

  type User = {
    username: string,
    email: string,
    password: string
  }
  const [signup, setSignup] = useState<User>({
    username: "",
    email: "",
    password: ""
  })


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`${backend_Uri}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup)

      })
      const body = await response.json()

      const token = await body.token

      localStorage.setItem("jwt", token as string)
      setSignup({
        username: "",
        email: "",
        password: ""
      })
      navigate("/send")
      
    } catch (e) {
      console.log(e)
    }

  


  }


  return (
    <div className="flex justify-center items-center font-mono opacity-50 flex-col mt-20 md:mt-0 border border-gray-600 text-gray-300 bg-stone-900 hover:border-gray-500 md:py-20 py-12 px-5 mx-2 md:px-30 rounded-3xl">
      <h1 className="md:text-4xl text-lg mb-10"> welcome ser!</h1>
      <form className="flex flex-col space-y-4 items-center" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <h1 className="italic hover:text-blue-500"> username</h1>
          <input type="text" value={signup.username} onChange={(e) => setSignup((prev) => ({ ...prev, username: e.target.value }))} className="border border-gray-500 rounded md:h-8" />
        </div>

        <div className="space-y-1 ">
          <h1 className="italic hover:text-yellow-400">email</h1>
          <input value={signup.email} type="text" onChange={(e) => setSignup((prev) => ({ ...prev, email: e.target.value }))} className="border border-gray-500 rounded md:h-8" />
        </div>

        <div className="space-y-1">
          <h1 className="italic hover:text-pink-500">password</h1>
          <input value={signup.password} onChange={(e) => setSignup((prev) => ({ ...prev, password: e.target.value }))} type="text" className="border border-gray-500 rounded md:h-8" />
        </div>
        <div className="flex justify-center mt-2 ">
          <button type="submit" className="border border-gray-500 px-3 py-1 rounded-md hover:border-gray-300 ">signup</button>
        </div>
        <div className="flex flex-row space-x-1 md:space-x-2">
          <h2 className="text-md">already signed up? </h2>
          <p className="underline text-stone-400"> <Link to="/signin"> sign in here</Link></p>
      </div>
      </form>
    </div>
  );
};

export default Signup;
