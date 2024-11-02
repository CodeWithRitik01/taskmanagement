import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions, mainReducer, mainSelector } from './Redux/reducers/mainReducers';
import {Toaster} from "react-hot-toast"

const Loginform = lazy(() => import("./loginForm/loginform"));
const SignUpForm = lazy(() => import("./signUpForm/signup"));
const HomePage = lazy(() => import("./Home/home"))
const Navbar = lazy(() => import("./Navbar/navbar"))
const AddTask = lazy(() => import("./AddTask/addtask"))

function Home(){
  const { user }= useSelector(mainSelector);
  const dispatch = useDispatch(mainReducer);
  const [showLogin, setShowLogin] = useState(true);
  const toggle = () =>{
    setShowLogin(!showLogin);
  }

  useEffect(()=>{
      const usersData = localStorage.getItem("user")
      const parseData = JSON.parse(usersData)
      dispatch(actions.setUser(parseData))
  },[])

 
    return(
      <Suspense fallback={<div style={{textAlign:"center", fontSize:"30px"}}>Loading...</div>}>
      {user ?
      <>
        <Navbar />
        <HomePage />
      </>
    
          :
          showLogin ? 
            <Loginform toggle={toggle}/>
            :
            <SignUpForm toggle={toggle}/>
           
      }

      </Suspense>
    )
}

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:(
        <Home />
      ),
 
    },
    {
      path:"/addtask",
      element:(
        <Suspense fallback={<div style={{textAlign:"center", fontSize:"30px"}}>Loading...</div>}>
          <AddTask />
        </Suspense>
      )
    }
  ])

  return (
    <div className="App">
        <RouterProvider router={router}/>
        <Toaster position='bottom-center'/>
    </div>
  )
}

export default App;
