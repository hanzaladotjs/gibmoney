const Send = () =>{
    return (
        <div className="flex flex-col justify-center items-center font-mono text-gray-400 ml-1 border md:px-8 px-4 rounded-xl py-20 bg-stone-900">
          
            <h1 className="md:text-4xl text-md  mb-10"> send money </h1>
            <h2 className="md:text-xl text-md  mr-24 mb-10"> avl balance: </h2>
          
            <p className="mb-2 mr-14">  reciever's username: </p>
            <input type="text" className="h-8 w-60 mb-2  italic text-yellow-200 border-gray-600 border rounded-md" placeholder="type w care " />
            <p className="mb-2 mr-46">  amount: </p>
            <input type="number" placeholder=" amount" className="h-12 rounded-md w-61  mb-2  italic border text-xl text-orange-500 border-gray-600" />
            <div className="flex justify-center items-center">
            <button className="px-5 mt-4 py-2  border italic rounded-lg"> send </button>
            </div>
        </div>
    )
}

export default Send