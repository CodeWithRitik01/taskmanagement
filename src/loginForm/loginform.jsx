import { useEffect, useState } from "react";
import styles from "./loginform.module.css"
import toast from "react-hot-toast";

function Loginform({toggle}){
  const [password, setPassword] = useState("");
  const [ email, setEmail] = useState("");
  const [ data, setData] = useState([])

  
  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const response = await fetch("/data.json")
        if (response.ok) { 
          const fetcheddata = await response.json(); 
          setData(fetcheddata);
      } else {
          console.error("Error: Response not OK", response.status);
      }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])


  const submitForm = (e) =>{
      const user = data.find((ele) => ele.email == email)
      if(!user){
        toast.error("User not exists")
        return new Error("User not exists")
      }

      if(user.password != password){
        toast.error("wrong password")
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("You are logged in")
      setEmail("")
      setPassword("")


  }

  return (
    <div className={styles.outterDiv}>
      <div className={styles.loginFormDiv}>
        <div className={styles.wrappingItems}>
          <h1>StudiovityPro</h1>
          <form className={styles.formStyles} onSubmit={submitForm}>
          <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/><br/>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
          <button type="submit" className={styles.loginButton}>Log in</button>
          </form>
        
          <div>
            <span>____________________   OR    ____________________</span>          
          </div>
          <div className={styles.withFb}>
            <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="not found"/>
            <span>Log in with Facebook</span>
          </div>

          <p style={{textAlign:"center"}}>Forgot password?</p>
        </div>
      </div>

      <div className={styles.otherfunc}>
          <span>Don't have an account?</span>
          <h3 onClick={toggle}>Sign up</h3>
      </div>

      <div className={styles.getApps}>
          <p>Get the app</p>
          <div className={styles.getSubDiv}>
            <div className={styles.playStore}>
                <img src="https://cdn-icons-png.flaticon.com/128/300/300218.png" alt="not found"/>
                <span>GET IT ON</span>
                <h4>Google Play</h4>
            </div>
            <div className={styles.microSoft}>
                <img src="https://cdn-icons-png.flaticon.com/128/732/732221.png" alt="not found"/>
                <span>GET IT FROM</span>
                <h4>Microsoft</h4>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Loginform;
