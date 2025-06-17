import './ce-form.css';
import React, { useState } from 'react';
let c=0;
function Forms()
{
    //states
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [changeform,updatechange]=useState(1);
    const [enteredname, setEnteredname] = useState('');
    const [enteredmail, setEnteredmail] = useState('');
    const [users,updateusers]= useState([]);
    //let size=users.length;
    //changehandlers
      const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
      };
    
      const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
      };
      const mailChangeHandler = (event) => {
        setEnteredmail(event.target.value);
      };
    
      const nameChangeHandler = (event) => {
        setEnteredname(event.target.value);
      };
      const submitHandler1 = (event) => {
        event.preventDefault();
        updatechange(2);
    };
    const submitHandler2 = async(event) => {
        event.preventDefault();
        let newusers=[]
        for(let i=0;i<users.length;i++)
        {
          if(users[i]!==null)
          {
            newusers.push(users[i])
          }
        }
        const res = await fetch("http://localhost:5001/create_team", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify({
        Eventname: enteredTitle,
        size: enteredAmount,
        user: newusers,
        leaders:localStorage.getItem('mail')
      })})
      updatechange(3)
    };
    const add_user=()=>
    {
      let obj={id: c,name: enteredname, mail: enteredmail}
        ++c;
        updateusers(users=>[...users,obj]);
    }
    const back_listener=()=>{
      updatechange(1);
    }
    //rendered form
    if(changeform===2)
    return(
        <div className='outer_form'>
          <form className='form' onSubmit={submitHandler2}>
            <div className='new-expense__controls'>
            <div className='new-expense__control'>
                <label>Name</label>
                <input onChange={nameChangeHandler} value={enteredname}></input>
            </div>
            <div className='new-expense__control'>
                <label>Gmail Address</label>
                <input onChange={mailChangeHandler} value={enteredmail}></input>
            </div>
            <div className='new-expense__actions'>
            <input type="button" onClick={add_user } value="Add" />
            </div>
              
                  <div className='container'>
                      {users.map(val=>{
                      if(val==null)
                      return(<></>)
                      else
                      return(
                          <div className='container_per'>
                              <div className='icon'></div>
                              <div className='name'>{val.name}</div>
                              <div className='name'>{val.mail}</div>
                              <div className='del_button'><input className='del' type='button' value='Delete' name='hello' onClick={()=>{
                                updateusers(users.map(vals=>{if(vals!==null){
                                if(vals.id==val.id)
                                return(null)
                                else
                                return({id: vals.id,name: vals.name, mail: vals.mail})
                                }
                                else
                                return(null)
                                }));}}></input></div>
                              </div>
                            )})}
                  </div>
                  <div className='new-expense__actions'><input type='submit' value='Save Event' /></div>
              </div>
            </form> 
        </div>
    )
    else if(changeform===1)
    return(
    <div className='outer_form'>
    <form className='form' onSubmit={submitHandler1}>
        <div className='new-expense__controls'>
        <div className='new-expense__control'>
        <label>Event Name</label>
        <input onChange={titleChangeHandler} value={enteredTitle}></input>
        </div>
        <div className='new-expense__control'>
        <label>Team Size</label>
        <input onChange={amountChangeHandler} value={enteredAmount}></input>
        </div>
        <div className='new-expense__actions'>
        <input type='submit'></input>
        </div>
        </div>
    </form>
    </div>
    )
    else if(changeform===3)
    {
      return(
      <div className='third_container'>
        <div className='tick_icon'></div>
        <div className='message'>Event Created Successfully</div>
        <div className='btn_contain'><button className='btn1' onClick={back_listener}>Back</button></div>
      </div>);
    }
}
export default Forms;