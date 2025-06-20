const Signup = () => {
  return (
    <div className="flex justify-center items-center font-mono flex-col border border-gray-600 text-gray-400 bg-stone-900 hover:border-gray-500 md:py-20 py-12 px-5 md:px-20 rounded-3xl">
        <h1 className="md:text-4xl text-lg mb-10"> welcome ser!</h1>
      <form className="flex flex-col   space-y-4 items-center">
        <div className="space-y-1">
          <h1 className="italic hover:text-blue-500"> username</h1>
          <input type="text" className="border border-gray-500 rounded md:h-8" />
        </div>

        <div className="space-y-1 ">
          <h1 className="italic hover:text-yellow-400">email</h1>
          <input type="text" className="border border-gray-500 rounded md:h-8" />
        </div>

        <div className="space-y-1">
          <h1 className="italic hover:text-pink-500">password</h1>
          <input type="text" className="border border-gray-500 rounded md:h-8" />
        </div>
        <div className="flex justify-center mt-2 ">
          <button className="border border-gray-500 px-3 py-1 rounded-md hover:border-gray-300 ">signup</button>
        </div>
        <h2>already signed up? <a className="underline text-stone-400"> sign in here</a></h2>
      </form>
    </div>
  );
};

export default Signup;
