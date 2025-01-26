// import { useSelector } from "react-redux"

import { useState } from "react"
import frameImg from "../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Hero from "./Hero"



function Template({ title, description1, description2, image, formType }){

  // const { loading } = useSelector((state) => state.auth)
  const [loading,useLoading]=useState(false);

  return (

    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center  ">

      { loading ? ( <div className="spinner"></div> ) : (
         
          <div className="mx-auto flex w-11/12 items-center max-w-maxContent flex-col-reverse justify-evenly gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 rounded-lg shadow-lg">

            <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
  
                {formType === "signup" ? <SignupForm /> : <LoginForm />}

            </div>

            <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
               <Hero/>
            </div>

          </div>
          
        )
     }

    </div>
  
 )}

export default Template