import React, { useContext, useState } from 'react';
import User from '../Event phase 3/commit_context';
import './item_list.css';
let turns=true;
let turns1=true;
let cc=0
function Item(prop)
{
    const ctx=useContext(User)
    let tot=true
    let tots=true
    const [itemlist,updateitem]=useState([])
    const [palat,updatepalat]=useState(true);
    function back_listenerss()
    {
        turns=false
        updatepalat(true)
    }
    const total=()=>{
        let sum=0
        for(let a=0;a<itemlist.length;a++)
        {
            sum=sum+parseInt(itemlist[a].val)
        }
        console.log(sum)
        return(sum)
    }
    const commit_price_temp=async()=>
    {
        const res = await fetch("http://localhost:5001/commit_par", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            mode:'cors',
            body: JSON.stringify({
            event:localStorage.getItem('current_event'),
            price:itemlist
        })})
        turns1=false
        updatepalat(false)
    }
    const commit_price=async()=>
    {
        console.log("working")
        const res = await fetch("http://localhost:5001/commit_price", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            mode:'cors',
            body: JSON.stringify({
            event:localStorage.getItem('current_event'),
            price:itemlist
        })})
        turns1=false
        updatepalat(false)
    }
    
    async function fetch_lists()
    {
        if(turns===true)
        {
            turns=false
        }
        else
        {
            turns=true
        }
        if(turns===false)
        {
            const res = await fetch("http://localhost:5001/provide_list", {
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
        if(obj.found==="true")
        {
            updateitem(obj.list)
        }
        else
        {
            turns=true
        }
      }
    }
    async function fetch_list2()
    {
        if(turns1===true)
        {
            turns1=false
        }
        else
        {
            turns1=true
        }
        if(turns1===false)
        {
            const res = await fetch("http://localhost:5001/get_price", {
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
            if(obj.list===null)
            {
                fetch_lists()
            }
            else
            {
                updateitem(obj.list.list)
            }
        }

    }
    if(prop.p[0]===3)
    {
        //turns=false
        fetch_list2()
    }
    else
    {
        fetch_lists()
    }
    console.log(itemlist)
    if(itemlist.length!=0)
    {
    if(palat)
    {
        return(
            <>
                <div className='oouters'>
                    <div class='extra'></div>
                    <div className='list_outer'>
                        <div className='item_header'>
                        <div className='dual'>Item</div>
                        {prop.p[0]===3?<div className='dual'>Price</div>:<div></div>}
                        </div>
                {itemlist.map((v)=>{
                        return(
                                <div className='items_con'>
                                    <div className='subject'>
                                        {(Object.keys(v))[0]}:{v[(Object.keys(v))[0]].length>1?(cc=0)||v[(Object.keys(v))[0]].map((q)=>{
                                                cc=cc+1
                                                console.log(cc)
                                                if(cc===v[(Object.keys(v))[0]].length)
                                                return(q)
                                                else
                                                return(q+', ')
                                            })
                                        :
                                        v[(Object.keys(v))[0]].map((q)=>{
                                            return(q)
                                        })}
                                    </div>
                                    <div>
                                        {prop.p[0]===3&&prop.p[1]==="true"?<div>{('commit' in v && v.commit==='true'?<div>{v.val}</div>:<div className='in'>{tot=false}<input value={"val" in v?v["val"]:""} onChange={(event)=>{
                                            let temp=itemlist.map((w)=>{
                                                if((Object.keys(w))[0]===(Object.keys(v))[0])
                                                {
                                                    let oo={val:event.target.value}
                                                    let yy={}
                                                    yy[(Object.keys(w))[0]]=w[(Object.keys(w))[0]]
                                                    let qw={...yy,...oo}
                                                    return(qw)
                                                }
                                                else
                                                {
                                                    return(w)
                                                }
                                            })
                                            turns1=false
                                            updateitem(temp)

                                        }}></input>
                                        </div>)}{'commit' in v?(v.commit==='true'?<div>Cost commited successfully</div>:<div>cost commit failed</div>):<div></div>}</div>
                                        :
                                        <div></div>}
                                    </div>
                                    <div>
                                        {prop.p[0]===3&&prop.p[1]!=="true"?<div>
                                        {'val' in v?<div>{v.val}{!('commit' in v)?<div><button onClick={()=>{
                                            let temp=itemlist.map((w)=>{
                                                if((Object.keys(w))[0]===(Object.keys(v))[0])
                                                {
                                                        if('clicked' in w)
                                                        {
                                                            if(w.clicked==='disagree')
                                                            {
                                                                let x=w.disagree
                                                                w.disagree=x-1
                                                                if('agree' in w)
                                                                {
                                                                    let x=w.agree
                                                                    w.agree=x+1
                                                                    w.clicked='agree'
                                                                    return(w)
                                                                }
                                                                else
                                                                {
                                                                    let oo={agree:1}
                                                                    w.clicked='agree'
                                                                    let qw={...w,...oo}
                                                                    return(qw)
                                                                }
                                                            }
                                                            else
                                                            {
                                                                return(w)
                                                            }
                                                        }
                                                        else
                                                        {
                                                            if('agree' in w)
                                                            {
                                                                let x=w.agree
                                                                w.agree=x+1
                                                                return(w)
                                                            }
                                                            else
                                                            {
                                                                let oo={agree:1,clicked:'agree'}
                                                                let qw={...w,...oo}
                                                                return(qw)
                                                            }
                                                        }
                                                }
                                                else
                                                {
                                                    return(w)
                                                }
                                            })
                                            turns1=false
                                            console.log('clicked')
                                            updateitem(temp)
                                        }}>Agree</button><button onClick={()=>{
                                            let temp=itemlist.map((w)=>{
                                                if((Object.keys(w))[0]===(Object.keys(v))[0])
                                                {
                                                    if('clicked' in w)
                                                    {
                                                        if(w.clicked==='agree')
                                                        {
                                                            let x=w.agree
                                                            w.agree=x-1
                                                            if('disagree' in w)
                                                            {
                                                                let x=w.disagree
                                                                w.disagree=x+1
                                                                w.clicked='disagree'
                                                                return(w)
                                                            }
                                                            else
                                                            {
                                                                let oo={disagree:1}
                                                                w.clicked='disagree'
                                                                let qw={...w,...oo}
                                                                return(qw)
                                                            }
                                                        }
                                                        else
                                                        {
                                                            return(w)
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if('disagree' in w)
                                                        {
                                                            let x=w.disagree
                                                            w.disagree=x+1
                                                            return(w)
                                                        }
                                                        else
                                                        {
                                                            let oo={disagree:1,clicked:'disagree'}
                                                            let qw={...w,...oo}
                                                            return(qw)
                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    return(w)
                                                }
                                            })
                                            turns1=false
                                            updateitem(temp)
                                        }}>Disagree</button>{tot=false}</div>:<div></div>}</div>:<div>{tot=false}{tots=false}"Not Available"</div>}
                                        </div>:<div></div>}
                                    </div>
                                </div>
                                )})}
                                {prop.p[0]===3&&prop.p[1]==="true"&&tot===false?<div className='btn_containss'><button className='btn_commit' onClick={commit_price}>Commit Price</button></div>:<div></div>}
                                {prop.p[0]===3&&prop.p[1]!=="true"&&tot===false&&tots?<div><button className='btn_commit' onClick={commit_price_temp}>Submit</button></div>:<div></div>}
                                {prop.p[0]===3&&tot?<div className='tyu'>Total: {total()}{ctx.changevall(true)}</div>:<div></div>}
                    </div>
                </div>
            </>
        )
    }
    else
    {
        return(
            <div className='third_container'>
              <div className='tick_icon'></div>
              <div className='message'>Price for the items has been successfully commited</div>
              <div className='btn_contain'><button className='btn1' onClick={back_listenerss}>Back</button></div>
            </div>);
    }
}
else{
    return(
        <div className='oouters'>
            <div class='extra'></div>
                <div className='list_outers'>
                    <div><h1>No plan available yet</h1></div>
                </div>
        </div>
    )
}
}
export default Item;