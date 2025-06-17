import {React,useState} from "react";
import './event.css'
import Item from '../Event phase 2/Item_list'
import Poll from '../Event phase 2/view_pool'
import Viewprogress from '../Event phase 4/progress_display'
let turn=true;
function Event(prop)
{
    const [event_switch,switch_update]=useState(false);
    const [event_list,update_list]=useState([])
    async function fetch_list()
    {
        if(turn===true)
        {
            turn=false
        }
        else{
            turn=true
        }
        if(turn===false)
        {
            const res = await fetch("http://localhost:5001/provide_event", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            mode:'cors',
            body: JSON.stringify({
            mail:localStorage.getItem('mail')
        })})
        const obj=await res.json()
        update_list(obj.list)
      }
    }
    fetch_list()
    if(event_switch===false)
    {
        return(
            <div className='event_container'>
                {event_list.map((v)=>{
                    return(
                        <button className='event_button' onClick={()=>{
                            localStorage.removeItem('current_event')
                            localStorage.setItem('current_event',v.name)
                            switch_update(true);
                            if(v.phase==="1")
                            {
                                prop.change(2)
                            }
                            else if(v.phase==="2")
                            {
                                prop.change(3)
                            }
                            else if(v.phase==="3")
                            {
                                prop.change(4)
                            }
                        }}>
                            <div className='inner_event_container'>
                            <div className='event_icon'>
                            </div>
                            <div className='event_name'>
                                Event Name: {v.name}
                            </div> 
                            <div className='event_name'>
                                Phase: {v.phase}
                            </div> 
                            </div>
                        </button>
                    )
                })}
        </div>)
    }
    else
    {
        for(let i=0;i<event_list.length;i++)
        {
            if(event_list[i].name===localStorage.getItem('current_event'))
            {
                if(event_list[i].phase==="1")
                {

                    return(
                        <>
                            <Poll></Poll>
                        </>
                    )
                }
                else if(event_list[i].phase==='2')
                {
                    return(
                        <>
                            <Item p={prop.phases}></Item>
                        </>
                    )
                }
                else if(event_list[i].phase==='3')
                {
                    return(
                        <>
                            <Viewprogress ></Viewprogress>
                        </>
                    )
                }
            }
        }
        
    }
}
export default Event;