import './progress_display.css'
const { useState } = require("react")
let turn=true
function Display()
{
    const [prolist,updateprolist]=useState([])
    async function progress_fetch()
    {
        if(turn===true)
        {
            turn=false
        }
        else
        {
            turn=true
        }
        if(turn===false)
        {
            const res = await fetch("http://localhost:5001/fetchProgress", {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                mode:'cors',
                body: JSON.stringify({
                Eventname: localStorage.getItem('current_event')
            })})
            const obj=await res.json()
            console.log(obj)
            if(obj!==null)
            updateprolist(obj.list)
        }
    }
    progress_fetch()
    return(
        <div className='oout'>
            {prolist.map((v)=>{
                return(
                    <div className='pro_outer'>
                        <div className='title'>{v.title}</div>
                        <div className='text'>
                            <div className='intext'>{v.text}</div>
                            <div className='dt'>
                                <div className='datetime'>{v.time}</div>
                                <div className='datetime'>{v.date}</div>
                            </div>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Display;