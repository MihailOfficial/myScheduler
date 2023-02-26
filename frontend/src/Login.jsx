//import Image from "next/image";
//import Link from "next/link";
//import React from "react";
import React,{useState} from 'react';
import styles from "./Login.css";


export default function Login() {
//   async function getEmployeeDataFromServer(data) {
//     const [username, password] = document.querySelectorAll(
//       `.${styles.inputbox}`
//     );
//     console.log(username.value, password.value);
//     let url = "";
//     if (username.value.includes("@")) {
//       url = `http://localhost:8080/visitor/get-visitor?email=${username.value}&password=${password.value}`;
//     } else {
//       url = `http://localhost:8080/staff/get-staff?loginId=${username.value}&password=${password.value}`;
//     }
//     let response = null;
//     try {
//       response = await fetch(url);
//       if (response.status === 202) {
//         sessionStorage.setItem("id", username.value);
//         window.location.href = "/OwnerHomepage";
//       }
//       if (response.status === 200) {
//         sessionStorage.setItem("id", username.value);
//         window.location.href = "/Homepage";
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
const [state,setState]=useState(false);
let url="";

  return (
    <div className={`row p-0 m-0 ${styles.bg}`}>
      <div className={`col-5 m-0 p-0 ${styles.bg}`}>
        
      </div>
      <div className="col">
        <div>
          <div className={`row justify-content-center ${styles.formatTitle}`}>
            <div className={`col-2`}>
              <div className={styles.circle}>
                
              </div>
            </div>
            <div className={`col-4 ${styles.titleFont}`}>GYST</div>
          </div>
          <div className="row justify-content-center">
            <div className={`col-7`}>
              <input
                className={`row form-control m-3 ${styles.inputbox}`}
                type="text"
                placeholder="Email"
              />
              <input
                className={`row form-control m-3 ${styles.inputbox}`}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="row justify-content-center ml-4">
            <div className="col-7 py-2">
              { <button
                className={`ml-5 ${styles.button}`}
                //onClick={getEmployeeDataFromServer}
              >
                Sign in
              </button> }
            </div>
          </div>
        </div>
        <div className={`${styles.account}`}>
           <a href={url}>Don't have an account?</a> 
        </div>
        <div className={`${styles.account}`}>
           <a href={url}>Forgot password?</a> 
        </div>
      </div>
    </div>
  );
}
