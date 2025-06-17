import {Link} from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import './menu.css'
function Menu(prop)
{
    const logout_handler=async ()=>{
        console.log('hello')
        const res = await fetch("http://localhost:5001/logout", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify({
        token: localStorage.getItem('token'),
      })})
      window.location.reload(true);
    }
    const onlogoutfailure=()=>{
        alert('Log out failed')
    }
    if(prop.phases[0]===1)
    {
        return(
        <div className='menu'> 
            <div className='link_container'>
                <div className='useless'></div>
                <div className='useless'></div>
                <div className='inner'>
                <Link className='links' to='/event'>Events</Link>
                <Link className='links' to='/create_event'>Create Event</Link>
                <Link className='links' to='/join_event'>Join Event</Link>
                </div>
                
            </div>
            <div className='logout_outer'>
                <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onLogoutSuccess={logout_handler}
                onScriptLoadFailure={onlogoutfailure}
                buttonText="Logout"
                ></GoogleLogout>
                
            </div>
        </div>
        )
    }
    else if(prop.phases[0]===2)
    {
        return(
            <div className='menu'> 
                <div className='link_container'>
                    <div className='useless'></div>
                    <div className='useless'></div>
                    <div className='inner'>
                    {prop.phases[1]==="true"?<Link className='links' to='/create_poll'>Create Poll</Link>:<div></div>}
                    <Link className='links' to='/view_poll'>View Polls</Link>
                    <Link className='links' to='/item_list'>View Plan</Link>
                    {prop.phases[1]==="true"?<Link className='links' to='/commit1'>Commit Phase</Link>:<div></div>}
                    </div>   
                </div>
                <div className='logout_outer'>
                <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onLogoutSuccess={logout_handler}
                onScriptLoadFailure={onlogoutfailure}
                buttonText="Logout"
                ></GoogleLogout>
                </div>
            </div>
        )
    }
    else if(prop.phases[0]===3)
    {
        return(
            <div className='menu'> 
                <div className='link_container'>
                    <div className='useless'></div>
                    <div className='useless'></div>
                    <div className='inner'>
                    <Link className='links' to='/item_list'>View Plan</Link>
                    {prop.phases[1]==="true"?<Link className='links' to='/commit2'>Commit Phase</Link>:<div></div>}
                    </div>   
                </div>
                <div className='logout_outer'>
                <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onLogoutSuccess={logout_handler}
                onScriptLoadFailure={onlogoutfailure}
                buttonText="Logout"
                ></GoogleLogout>
                </div>
            </div>
        )
    }
    else if(prop.phases[0]===4)
    {
        return(
            <div className='menu'> 
                <div className='link_container'>
                    <div className='useless'></div>
                    <div className='useless'></div>
                    <div className='inner'>
                    <Link className='links' to='/view_poll'>Discuss</Link>
                    <Link className='links' to='/display_progress'>View Progress</Link>
                    {prop.phases[1]==="true"?<Link className='links' to='/create_progress'>Add Progress</Link>:<div></div>}
                    </div>   
                </div>
                <div className='logout_outer'>
                <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onLogoutSuccess={logout_handler}
                onScriptLoadFailure={onlogoutfailure}
                buttonText="Logout"
                ></GoogleLogout>
                </div>
            </div>
        )
    }
}
export default Menu;