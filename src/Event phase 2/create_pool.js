import React, { useState } from 'react';
import './create_pool.css'
let c=0;
function Create_pool()
{
    const [subinput,updatesub]=useState('');
    const [quesinput,updateques]=useState('');
    const [optinput,updateopt]=useState('');
    const [queslist,updatelist]=useState([]);
    const [qchange,updateq]=useState(false);
    const sublistener=(event)=>{
        updatesub(event.target.value)
    }
    const queslistener=(event)=>{
        updateques(event.target.value)
    }
    const optlistener=(event)=>{
        updateopt(event.target.value)
    }
    const listlistener=()=>{
        let obj={id: c,op: optinput}
        ++c;
        updatelist(queslist=>[...queslist,obj]);
    }
    const formhandler=async(event)=>{
        event.preventDefault();
        let newques=[]
        for(let i=0;i<queslist.length;i++)
        {
          if(queslist[i]!==null)
          {
            newques.push(queslist[i])
          }
        }
        const res = await fetch("http://localhost:5001/create_poll", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify({
        Eventname: localStorage.getItem('current_event'),
        opt: newques,
        ques:quesinput,
        sub: subinput
      })})
      updateq(true)
    }
    const back_listener=()=>{
        updateq(false)
      }
    if(qchange===false)
    {
        return(
            <div className='outer_form'>
                <form className='form' onSubmit={formhandler}>
                    <div className='new-expense__controls'>
                    <div className='new-expense__control'>
                        <label>Subject</label>
                        <input value={subinput} onChange={sublistener}></input>
                    </div>
                    <div className='new-expense__control'>
                        <label>Question of poll</label>
                        <input value={quesinput} onChange={queslistener}></input>
                    </div>
                    <div className='new-expense__control'>
                        <label>Option</label>
                        <input value={optinput} onChange={optlistener}></input>
                    </div>
                    <div className='new-expense__actions'>
                        <input type="button" value="Add" onClick={listlistener}></input>
                    </div>
                    <div className='container'>
                        {queslist.map(val=>{
                        if(val==null)
                        return(<></>)
                        else
                        return(
                            <div className='container_per'>
                                <div className='icons'></div>
                                <div className='name'>{val.op}</div>
                                <div className='del_button'><input className='del' type='button' value='Delete' name='hello' onClick={()=>{
                                    updatelist(queslist.map(vals=>{if(vals!==null){
                                    if(vals.id==val.id)
                                    return(null)
                                    else
                                    return({id: vals.id,op: vals.op})
                                    }
                                    else
                                    return(null)
                                    }));}}></input></div>
                                </div>
                                )})}
                    </div>
                    <div className='new-expense__actions' >
                    <input type='submit' value='Start poll' />
                    </div>
                    </div>
                </form>
            </div>
        )
    }
    else{
        return(
            <div className='third_container'>
                <div className='tick_icon'></div>
                <div className='message'>Poll created Successfully</div>
                <div className='btn_contain'><button className='btn1' onClick={back_listener}>Back</button></div>
            </div>
        )
    }
}
export default Create_pool;