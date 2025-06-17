import './App.css';
import'./font.css';
import { useState } from 'react';
import Header from './header/headers'
import Front from '../src/login and front/front'
import GoogleLogin from 'react-google-login'
import Main from './start page/main';
import ViewEvent from './start page/event';
localStorage.setItem('token', '');
function App() {
  const [isloggedin,setlogin]=useState(false);
  //function to check login
  async function check()
  {
    
    const res = await fetch("http://localhost:5001/check", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify({
        token: localStorage.getItem('token'),
        mails: localStorage.getItem('mail')
      })})
      const obj=await res.json()
      if(obj.loggedin==="true")
      {}
      else
      {
        setlogin(false);
      }
         console.log(obj)
  }
  check()
  //login handler for google
  async function handleLogin(googleData){
    localStorage.removeItem('token')
    localStorage.setItem('token',googleData.tokenId)
    const res = await fetch("http://localhost:5001/log_me_in", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify({
        token: googleData.tokenId
      })
    })
    localStorage.removeItem('mail')
    console.log(googleData)
    localStorage.setItem('mail',googleData.Lu.Bv)
      setlogin(true)
      console.log(isloggedin);
  }

  /*
  async function handleLo(googleData){
    //console.log(googleData)
    await axios.post("http://localhost:5001/log", {token: googleData})
  }
  handleLo("pass")
  */
    return (
      <div>
          <div className='app-login'>
          <Header></Header>
          {isloggedin?
            <Main />
            
          :
          <>
            <Front></Front>
            <div className='login_button'>
              <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Log in with Google"
                  onSuccess={handleLogin}
                  onFailure={handleLogin}
                  prompt='consent'
                  cookiePolicy={'single_host_origin'}
              />
            </div>
          </>
          }
        </div>
      </div>
    );
}

export default App;
