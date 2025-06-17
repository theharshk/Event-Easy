import {useState} from 'react';
import './join_event.css'
let exist=false;
let allowed=false;
function Join()
{
    const [Eventname, updateevent] = useState('');
    const [changeform, updateform] = useState(false);
    const Eventnamehandler=(event)=>{
        updateevent(event.target.value)
    }
    const submithandlerd=async (event)=>{
        event.preventDefault();
        const res = await fetch("http://localhost:5001/join_event", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify({
        eventname: Eventname,
        mail:localStorage.getItem('mail')
      })})
      const obj=await res.json()
      if(obj.exist=="true")
      {
            exist=true;
      }
      else{
          exist=false;
      }
      if(obj.allowed==='true')
      {
          allowed=true;
      }
      else{
          allowed=false;
      }
      updateform(true);
    }
    function Back_join()
    {
        exist=false
        allowed=false
        updateform(false)
    }
    if(changeform===false)
    {
    return(
        <div className='outer_form'>
            <form className='form' onSubmit={submithandlerd}>
                <div className='new-expense__controls'>
                    <div className='new-expense__control'>
                        <label>Event Name</label>
                        <input value={Eventname} onChange={Eventnamehandler}></input>
                    </div>
                    <div className='new-expense__actions'>
                        <input type='submit'></input>
                    </div>
                </div>
            </form>
        </div>
    )
    }
    else
    {
        let message;
        if(exist===true&&allowed===true)
        {
            message="Event joined Successfully";
        }
        else if(exist===true&&allowed===false)
        {
            message="Event exists but you are not allowed to join the event"
        }
        else if(exist===false)
        {
            message="No event with this name Exist";
        }
        return(
            <div class='outer_form'>
                <div className='messages'><h1>{message}</h1></div>
                <div className='btn_contain'>
                <button className='btn1' onClick={Back_join}>Back</button>
                </div>
            </div>
        )
    }
}
export default Join;