const Signin = () => {
    return (
      <div className="flex flex-col justify-center items-center font-mono border border-gray-600 text-gray-400 bg-stone-900 hover:border-gray-500 md:py-30 py-16 px-9 md:px-0 rounded-3xl">
        <h1 className="md:text-4xl text-lg mb-10 w-100 text-center"> happy to see you back ser! </h1>
        <form className="flex flex-col   space-y-4 justify-center">
          <div className="space-y-1">
            <h1 className="italic hover:text-blue-500"> username</h1>
            <input type="text" className="border border-gray-500 rounded md:h-8" />
          </div>

  
          <div className="space-y-1">
            <h1 className="italic hover:text-pink-500">password</h1>
            <input type="text" className="border border-gray-500 rounded md:h-8" />
          </div>
          <div className="flex justify-center mt-2 ">
            <button className="border border-gray-500 px-3 py-1 hover:bg-black rounded-md hover:border-gray-300 ">signin</button>
          </div>
        
        </form>
      </div>
    );
  };
  
  export default Signin;
  