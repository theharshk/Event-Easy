import React, { useState } from 'react';
import './commit.css';
import Item from './Item_list';
function Commit(prop)
{
    const [commitphase1,updatecommit]=useState(false)
    async function commithandler()
    {
        const res = await fetch("http://localhost:5001/commit1", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            mode:'cors',
            body: JSON.stringify({
            event:localStorage.getItem('current_event'),
            phase:"2"
        })})
        prop.change(3)
        updatecommit(true)
    }
    if(commitphase1===false)
    return(
        <>
            <div className='Ccontainer'>
                <div className='Cmessage'>
                    <h1 className='mess'>Are You Sure About Commiting This Phase?</h1> 
                    <h1 className='mess'>Once Commited You Can Not Return To This Phase</h1>
                </div>
                <div className='Cbutton'>
                    <button onClick={commithandler} className='btn_commit'>Commit</button>
                </div>
            </div>
        </>
    )
    else
    {
        return(
            <>
                <Item p={prop.phases}></Item>
            </>
        )
    }
}
export default Commit;