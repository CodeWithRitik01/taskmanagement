import { useState } from "react";
import styles from "../loginForm/loginform.module.css"

function SignUpForm({toggle}){

  const handleFormSubmit = async (e) =>{
    e.preventDefault();
    

  }

  return (
    <div className={styles.outterDiv}>
      <div className={styles.loginFormDiv}>
        <div className={styles.wrappingItems}>
          <h1>StudiovityPro</h1>
          <h5 style={{fontFamily:"cursive"}}>Sign up to see your content</h5>
          <form className={styles.formStyles}>
            <input type="text" placeholder="Full Name"/>
            <input type="email" placeholder="Enter email"/><br/>
            <input type="password" placeholder="Password"/>
            <button className={styles.loginButton}>Sign up</button>
          </form>

        </div>
      </div>

      <div className={styles.otherfunc}>
          <span>Have an account?</span>
          <h3 onClick={toggle}>Log In</h3>
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

export default SignUpForm;
