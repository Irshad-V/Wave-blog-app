import React, { useState ,useEffect} from 'react'
import './Auth.scss'
import CloseBtn from '../components/CloseBtn'

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",

}
function Auth() {
  const [state, setState] = useState(initialState)
  const [signUp, setSignUp] = useState(false)
  const [notification, setNotification] = useState(false)

  const { email, password, confirmPassword, firstName, lastName } = state;


  const handleChange = (e) => {
    setState({
      ...state, [e.target.name]: e.target.value
    })
    // console.log(state)
  }

  useEffect(() => {
    if (notification) {
      console.log("notification:", notification);
    }
  }, [notification]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(false)
    console.log("submitted 1")
    console.log(notification);
    console.log("submitted ")

    if (!signUp) {

    } else {

      if (password !== confirmPassword) {
        console.log("checkin password..... ")
        console.log(state)
        setNotification(true)
        console.log(notification);
        return
      } else {


      }
    }
  }
  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className=' pt-5 mb-4 text-center fs-18 fw-6 ' >
          {!signUp ? "Sign-in" : "Sign-Up"}
          {notification && (<CloseBtn Name="Err" Info="Password doesn't match" />)}
        </div>
        <div className='register-form    m-auto' style={{ maxWidth: "650px" }}>
          <form className='m-auto' onSubmit={handleSubmit}>
            {signUp && (
              <div className='Name-section row '>
                <div className='py-3 col-sm-6' >
                  <input type='text'
                    className='form-control input-text-box'
                    name='firstName'
                    value={firstName}
                    placeholder='FirstName'
                    onChange={handleChange}
                  />
                </div>
                <div className=' py-3 col-sm-6 ' >
                  <input type='text'
                    className='form-control input-text-box'
                    name='lastName'
                    value={lastName}
                    placeholder='LastName'
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className='commen-area w-100'>
              <div className=' py-3 col-12 ' >
                <input type='text'
                  className='form-control input-text-box'
                  name='email'
                  value={email}
                  placeholder='email'
                  onChange={handleChange}
                />
              </div>
              <div className=' py-3 col-12 ' >
                <input type='text'
                  className='form-control input-text-box'
                  name='password'
                  value={password}
                  placeholder='Password'
                  onChange={handleChange}
                />
              </div>

              {signUp && (
                <div className=' py-3 col-12 ' >
                  <input type='text'
                    className='form-control input-text-box'
                    name='confirmPassword'
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className='text-center col-12 py-3'>

                <button type='submit'
                  className={` ${!signUp ? "btn-sign-in" : "btn-sign-up"}`} >  {!signUp ? "Sign-in" : "Sign-Up"}
                </button>
              </div>
            </div>
          </form>
          <div className='additional-info text-center py-3'>
            <p>
              {!signUp ? (
                <>
                  Don't have an account ?&nbsp;&nbsp;
                  <span
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#298af2",
                    }}
                    onClick={() => setSignUp(true)}

                  >
                    Sign Up</span>
                </>
              ) : (
                <>
                  Already have an account ?&#160;&nbsp;
                  <span
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#298af2",
                    }}
                    onClick={() => setSignUp(false)}

                  >Sign In</span>
                </>
              )}
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
