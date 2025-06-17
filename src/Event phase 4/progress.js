import { useState } from "react";
function Progress()
{
    const [c,updatec]=useState(0)
    const [enteredTitleh,updatetitle]=useState('')
    const [enteredAmounth,updateamount]=useState('')
    function titleChangeHandlerj(event)
    {
        updatetitle(event.target.value)
    }
    function amountChangeHandlerj(event)
    {
        updateamount(event.target.value)
    }
    const submitHandler1=async (event)=>
    {
        event.preventDefault();
        const res = await fetch("http://localhost:5001/StoreProgress", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            mode:'cors',
            body: JSON.stringify({
            Eventname: localStorage.getItem('current_event'),
            title: enteredTitleh,
            text: enteredAmounth,
            leaders:localStorage.getItem('mail')
        })})
        updatec(1)

    }
    const back_listener=()=>{
        updatec(0)
    }
    if(c==0)
    return(
        <div className='outer_form'>
        <form className='form' onSubmit={submitHandler1}>
            <div className='new-expense__controls'>
            <div className='new-expense__control'>
            <label>Progress Title</label>
            <input onChange={titleChangeHandlerj} value={enteredTitleh}></input>
            </div>
            <div className='new-expense__control'>
            <label>Progress Text</label>
            <input onChange={amountChangeHandlerj} value={enteredAmounth}></input>
            </div>
            <div className='new-expense__actions'>
            <input type='submit'></input>
            </div>
            </div>
        </form>
        </div>
    )
    else if(c==1)
    return(
        <div className='third_container'>
          <div className='tick_icon'></div>
          <div className='message'>Progress added successfully</div>
          <div className='btn_contain'><button className='btn1' onClick={back_listener}>Back</button></div>
        </div>);
}
export default Progress