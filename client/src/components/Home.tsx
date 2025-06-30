const Home = () => {
  return (
    <div className="flex font-mono md:justify-center justify-start md:min-h-150 min-h-screen md:mt-0 mt-90 fixed items-center text-gray-600 font-mono md:mx-0 mx-2 text-6xl">
      <h1 className="flex flex-col md:w-full md:h-full h-50  md:space-x-6 md:flex-row md:justify-center ">
        <p className=" w-40 md:w-full hover:bg-white bg-black rounded md:py-1 ">Send </p>{" "}
        <p className="w-30 md:w-full hover:bg-green-500 bg-black  md:py-1 rounded">and </p>{" "}
        <p className="hover:bg-pink-300 w-65 md:w-full bg-black   md:py-1 rounded "> Recieve </p>{" "}
        <p className="hover:bg-yellow-300 bg-black w-45 md:w-full md:py-1 rounded  ">money. </p> 
      </h1>
    </div>
  );
};

export default Home;
