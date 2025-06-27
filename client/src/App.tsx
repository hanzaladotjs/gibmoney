import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import './App.css'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Send from './components/Send'

function App() {

  return (
    <BrowserRouter>
   
      <Navbar/>
      <div className='flex justify-center items-center md:min-h-180  min-h-150'>
        <Routes>
         
          <Route path='/' element={<Home/>}> </Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/send" element={<Send/>}></Route>
          
        </Routes>
        </div>
    
    </BrowserRouter>
  )
}

export default App
