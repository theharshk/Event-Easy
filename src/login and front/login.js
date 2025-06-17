import GoogleLogin from 'react-google-login'
function login(props)
{
  const handleLogin = async googleData => {
    const res = await fetch("http://localhost:5000/log_me_in", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    props.checkstatus(true);
    //const data = await res.json()
    /*
    const res=await fetch("http://localhost:5000/check")
    const obj=await res.json()
         console.log(obj)
         */
  }
    return(
    <div>
    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
    />
    </div>)
}
export default login;