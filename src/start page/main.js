import {Route } from 'react-router-dom';
import React, { useState } from 'react';
import Menu from './menu';
import Event from './event';
import Join_event from './join_event';
import Create_event from './create-event';
import Create_poll from '../Event phase 2/create_pool'
import View_poll from '../Event phase 2/view_pool'
import Item_list from '../Event phase 2/Item_list'
import Commit1 from '../Event phase 2/commit'
import Commit2 from '../Event phase 3/commit_price'
import MyContext from '../Event phase 3/commit_context';
import CreateProgress from '../Event phase 4/progress';
import DisplayProgress from '../Event phase 4/progress_display';
import './main.css';
function Main()
{
    const [phase,updatephase]=useState([1,"false"])
    console.log(phase)
    async function setphase(val)
    {
        const res = await fetch("http://localhost:5001/check_leader", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify({
        mail: localStorage.getItem('mail'),
        event:localStorage.getItem('current_event')
      })})
      const obj=await res.json()
      if(obj.status==='true')
      {
            updatephase([val,"true"])
      }
      else{
        updatephase([val,"false"])
      }
    }
    const [vall,updatevall]=useState(false)
    function changevall(v)
    {
        updatevall(v)
    }
    return(
      <MyContext.Provider value={{ vall, changevall }}>
        <div className='nav'>
            <Menu phases={phase}></Menu>
            <div className='main'>
            <Route path='/event'><Event change={setphase} phases={phase}></Event>
            </Route>
            <Route path='/create_event'><Create_event />
            </Route>
            <Route path='/join_event'><Join_event /></Route>
            <Route path='/create_poll'><Create_poll /></Route>
            <Route path='/view_poll'><View_poll p={phase}></View_poll></Route>
            <Route path='/item_list'><Item_list p={phase}></Item_list></Route>
            <Route path='/commit1'><Commit1 change={setphase} phases={phase}></Commit1></Route>
            <Route path='/commit2'><Commit2 change={setphase}></Commit2></Route>
            <Route path='/create_progress'><CreateProgress /></Route>
            <Route path='/display_progress'><DisplayProgress /></Route>
            </div>
        </div>
      </MyContext.Provider>
    )
}
export default Main;