


import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  emoji: string
  size: number
  velocity: { x: number; y: number }
  rotation: number
  rotationSpeed: number
}

export const EmojiConfetti: React.FC = () => {
  const [isExploding, setIsExploding] = useState(true)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])

  const emojis = ['🎉', '🎊', '🥳', '🍾', '🎈', '🎇', '✨', '💥']

  useEffect(() => {
    if (isExploding) {
      const canvas = canvasRef.current
      const button = buttonRef.current
      if (!canvas || !button) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const updateCanvasSize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      updateCanvasSize()
      window.addEventListener('resize', updateCanvasSize)

      const buttonRect = button.getBoundingClientRect()
      const centerX = buttonRect.left + buttonRect.width / 2
      const centerY = buttonRect.top + buttonRect.height / 2

      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2
        const velocity = 5 + Math.random() * 5
        particles.current.push({
          x: centerX,
          y: centerY,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: 20 + Math.random() * 20,
          velocity: {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
          },
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        })
      }

      const animate = () => {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.current = particles.current.filter((particle) => {
          particle.x += particle.velocity.x
          particle.y += particle.velocity.y
          particle.velocity.y += 0.1 // gravity
          particle.rotation += particle.rotationSpeed

          if (particle.y < canvas.height) {
            ctx.save()
            ctx.translate(particle.x, particle.y)
            ctx.rotate(particle.rotation)
            ctx.font = `${particle.size}px Arial`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(particle.emoji, 0, 0)
            ctx.restore()
            return true
          }
          return false
        })

        if (particles.current.length > 0) {
          requestAnimationFrame(animate)
        } else {
          setIsExploding(false)
        }
      }

      animate()

      return () => {
        window.removeEventListener('resize', updateCanvasSize)
      }
    }
  }, [isExploding])

  const handleClick = () => {
    setIsExploding(true)
    particles.current = []
  }

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        className="text-md transform-gpu rounded-lg bg-red-500 px-6 py-2 font-semibold text-white"
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        ...
      </motion.button>
      {isExploding && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0"
          style={{ zIndex: 9999 }}
        />
      )}
    </div>
  )
}



const Send = () => {
 const backend_Uri = import.meta.env.VITE_BACKEND_URI
 const token = localStorage.getItem("jwt")
  const [balance, setBalance] = useState<any>(token ? "loading. please wait." : "please signin first")
  const [success, setSuccess] = useState<string>("pending/not initiated")

 

  const fetchBalance = async() => {
    const response = await fetch(`${backend_Uri}/account/balance`, {
      method: "GET",
      headers : {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setBalance(data.balance)
  }

  useEffect( () => {
  fetchBalance()
  }
  , [balance])

  type Money = {
    address: string,
    amount: any
  }

  const [money, setMoney] = useState<Money>({
    address:"",
    amount:""
  })
 
  type User = {
    username: string,
    email: string,
    password: string,

    _id: string
  }


  const [users, setUsers] = useState<User[]>([])


  const fetchUsers = async () => {
    const response = await fetch(`${backend_Uri}/user/`)
    const data = await response.json()
    setUsers(data.users)

  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    
    e.preventDefault()
if (!token) {
      setSuccess("Error: No authentication token");
      return;
    }
   
   const response = await fetch(`${backend_Uri}/account/send`, {
    
      method: "PUT",
      headers: {
      "Content-Type" : "application/json",
      "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(money)
      
      

    })
const data = await response.json() 
if (data.message=="success"){
  setSuccess("Done")
}

setMoney({
  address: "",
  amount: 0
})
   }




  useEffect(
    () => { fetchUsers() }
    , []
  )

  function setAddress(id:string) {
    setMoney((prev) => ({...prev, address: id }))
  }

  return (
    <div>
      <div className="flex flex-col mt-5 justify-center items-center font-mono text-gray-300 ml-1 border md:px-20 px-3 rounded-2xl py-10 opacity-50 bg-stone-900">
        <h1 className="md:text-4xl text-xl font-bold mb-10"> send money </h1>
        <h2 className="md:text-xl text-md  text-center mb-10"> avl balance: <br></br>{balance} </h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
          <p className="mb-2 mr-14"> reciever's address: </p>
          <input
          value={money.address}
          onChange={(e) => setMoney((prev) => ({...prev, address: e.target.value}))}
            type="text"
            className="h-8 w-60 mb-2  italic text-yellow-200 border-gray-600 border rounded-md"
            placeholder="type w care "
          />
          <p className="mb-2 mr-46"> amount: </p>
          <input
          onChange={(e)=> setMoney((prev)=> ({...prev, amount: Number(e.target.value)}))}
            value={money.amount}
           
            placeholder=" amount"
            className="h-12 rounded-md w-61  mb-2  italic border text-xl text-orange-500 border-gray-600"
          />
          <div className="flex justify-center items-center">
            <button  type="submit" className="px-5 mt-4 py-2  border italic rounded-lg">
              {" "}
              send{" "}
            </button>
          </div>

          <div className="text-center font-semibold text-green-400 mt-4 w-30">
           

            Status : {success}
          </div>
           { success == "Done" ?
            <EmojiConfetti></EmojiConfetti> : null }
        </form>
      </div>
      <ul className="text-white mt-3">
        {users.map((user, _id) => {
          return (
            <div key={user._id} className="flex justify-between mx-1 items-center">
              <li>{user.username}
              </li>
              <button type="submit" onClick={ () => setAddress(user._id)}>
                send
              </button>
            </div>
          )
        })}
      </ul>
    </div>
  );
};

export default Send;
