import { useEffect, useState } from "react";


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
  amount: ""
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
            type="number"
            placeholder=" amount"
            className="h-12 rounded-md w-61  mb-2  italic border text-xl text-orange-500 border-gray-600"
          />
          <div className="flex justify-center items-center">
            <button  type="submit" className="px-5 mt-4 py-2  border italic rounded-lg">
              {" "}
              send{" "}
            </button>
          </div>

          <div className="text-center mt-4 w-30">
            Status : {success}
          </div>
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
