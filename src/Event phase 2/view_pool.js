import {useState} from 'react';
import './view_poll.css';
let turn=true;
let con1=false;
const a='ques_button'
const b='ques_buttons'
let opid;
function ViewPoll(prop)
{
    
    const [poll_list,updatepoll]=useState([])
    const [optid,updateids]=useState("")
    const [answerid,updateansid]=useState([])
    const setc=(v)=>{
        for(let i=0;i<v.answer.length;i++)
        {
            if(v.answer[i].none===localStorage.getItem('mail'))
            {
                opid=v.answer[i].option;
                return(1); 
            }
        }
        opid='none'
        return(2)
    }
    const setc1=(o)=>{
        if(o.id==opid)
        {
            return(1)
        }
        else
        {
            return(2)
        }
    }
    async function AddAnswer()
    {
        con1=false;
        const res = await fetch("http://localhost:5001/Add_Answer", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            mode:'cors',
            body: JSON.stringify({
            mail:localStorage.getItem('mail'),
            quesid:answerid
        })}).then(()=>{fetch_lists()})
    }
    if(con1===true)
    {
        AddAnswer()
    }
    async function fetch_lists()
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
            const res = await fetch("http://localhost:5001/provide_ques", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            mode:'cors',
            body: JSON.stringify({
            event:localStorage.getItem('current_event')
        })})
        const obj=await res.json()
        updatepoll(obj.list)
      }
    }
    fetch_lists()
    const deletehandler=async()=>
    {
        const res = await fetch("http://localhost:5001/delete_ques", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            mode:'cors',
            body: JSON.stringify({
            que:optid
        })})
        turn=true;
        fetch_lists()
    }
    if(poll_list.length!==0)
    return(
        <div className='oouter'>
            {poll_list.map((v)=>{
                
                    return(
                        <div className='ques_outer'>
                            <div className='ques'>
                                <button className={setc(v)===1?'ques_button':'ques_buttons'} onClick={()=>{
                                    turn=false
                                    updateids(v._id)
                                }}>
                                    <div>{v.ques}</div>
                                </button>
                            </div>
                            {v._id===optid?
                                <div className='opt_container'>{v.option.map((o)=>{
                                    return(<div className='opt'><button className={setc1(o)==1?'option1':'option'}
                                     onClick={()=>{
                                         turn=false
                                        con1=true
                                        updateansid([v._id,o.id])
                                    }}>{o.op}</button></div>)
                                })}</div>
                                :
                                <></>
                            }
                        </div>
                    )
                })}
                {optid!==''&&prop.p[1]==='true'?<div><button onClick={deletehandler}>Delete</button></div>:<></>}
        </div>
    )
    else
    return(
        <div className='ques_outer'>
            <h1>No poll has been launched yet</h1>
        </div>
    )
}
export default ViewPoll;