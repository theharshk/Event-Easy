import React, { useState ,useContext} from 'react';
import User from '../Event phase 3/commit_context';
import '../Event phase 2/commit.css';
function Commit(prop)
{
    const [commitphase1,updatecommit]=useState(false)
    const ctx=useContext(User)
    let uu=true
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
            phase:"3"
        })})
        prop.change(4)
        updatecommit(true)
    }
    if(commitphase1===false&&ctx.vall)
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
    else if(commitphase1===false&&!ctx.vall)
    {
        return(
        <>
            <div className='Ccontainer'>
                <div className='Cmessage'>
                    <h1 className='mess'>You can not commit this phase until all the price gets commited</h1> 
                </div>
            </div>
        </>
        )
    }
    else
    {
        return(
            <>
                <div />
            </>
        )
    }
}
export default Commit;