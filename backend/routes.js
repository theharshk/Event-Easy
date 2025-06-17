const express=require('express')
const router=express.Router()
const event=require('./schema');
const dotenv = require('dotenv');
const usersmodel=require('./team-schema');
const quesmodel=require('./question_schema');
const { OAuth2Client } = require('google-auth-library');
const joinmodel=require('./joined_event')
const pricemodel=require('./price_schema')
const pricetemp=require('./price_temp_schema');
const progress=require('./progress_schema')
const { deleteOne } = require('./schema');
dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

async function verify(token)
{
  return(await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  }));
}
router.post('/logout',async(req,res)=>{
  const t=req.body.token
  await event.deleteOne({token:t});
  res.status(201);
  res.send('hello')
})
router.post('/create_team',async(req,res)=>{
  const userd=new usersmodel({event_name:req.body.Eventname,
  size:req.body.size,
  user:req.body.user,
  leader: req.body.leaders})
  await userd.save()
  res.status(201);
  res.send('hello')
})
router.post('/provide_event',async(req,res)=>{
  const li=await joinmodel.find({mail:req.body.mail})
  res.json({list:li})  
})
router.post('/join_event',async (req,res)=>{
  const ma=req.body.mail
  const e=await usersmodel.find({event_name: req.body.eventname,"user.mail":ma})
  if(e.length==0)
  {
    res.json({exist:"false",allowed:"false"});
  }
  else
  {
    res.json({exist:"true",allowed:"true"});
    const list=joinmodel({mail:req.body.mail,name:req.body.eventname,phase:"1"})
    await list.save()
  }
  res.status(201);
})
router.post('/log_me_in',async (req,res)=>{
  const tokens  = req.body.token;
  /*
    const ticket = verify(tokens)
    console.log(ticket)
    //const { name, email, picture } = ticket.getPayload();
    */
    const user=new event({token:tokens})
    await user.save();
    res.status(201);
    res.send('hello')
})
router.post('/create_poll',async(req,res)=>{
    const q=new quesmodel({event:req.body.Eventname, ques:req.body.ques, subject:req.body.sub, option:req.body.opt, answer:[{"none":"a"}]})
    await q.save()
    res.status(201);
    res.send('hello')
})

router.post('/delete_ques',async(req,res)=>{
  await quesmodel.deleteOne({ _id: req.body.que });
  res.status(201);
  res.send('hello')
})

router.post('/provide_ques',async(req,res)=>{
  const e=await quesmodel.find({event:req.body.event})
  res.json({list:e})
  res.status(201);
})

router.post('/get_price',async(req,res)=>{
  const li=await pricemodel.findOne({name:req.body.event})
  if(li===null)
  {
    res.json({list:null})
  }
  else
  res.json({list:li})
  res.status(201);
})

router.post('/commit_price',async(req,res)=>{
  a=await pricemodel.findOne({name:req.body.event});
  if(a!==null)
  {
    await pricemodel.deleteOne({name:req.body.event});
  }
  const c=new pricemodel({name:req.body.event,list:req.body.price})
  await c.save()
  const k=await pricetemp.findOne({name:req.body.event})
  if(k===null)
  {
    const c1=new pricetemp({name:req.body.event,list:req.body.price})
    await c1.save()
  }
  else
  {
    await pricetemp.deleteOne({name:req.body.event});
    const c1=new pricetemp({name:req.body.event,list:req.body.price})
    await c1.save()
  }
  res.status(201);
  res.send('hello')
})

router.post('/commit_par',async(req,res)=>{
  a1=await usersmodel.findOne({event_name:req.body.event})
  let z=a1.size/2
  const li=await pricetemp.findOne({name:req.body.event})
  for(let i=0;i<req.body.price.length;i++)
  {
    let ag=-1
    let di=-1
    if('agree' in req.body.price[i])
    {
      ag=req.body.price[i].agree
    }
    if('disagree' in req.body.price[i])
    {
      di=req.body.price[i].disagree
    }
    if(ag!==-1&&ag!==0)
    {
      'agree' in li.list[i]?li.list[i].agree+=ag:li.list[i]={...li.list[i],agree:1}
    }
    if(di!==-1&&di!==0)
    {
      'disagree' in li.list[i]?li.list[i].disagree+=di:li.list[i]={...li.list[i],disagree:1}
    }
    if(!('commit' in li.list[i]) && 'agree' in li.list[i] && li.list[i].agree>z)
    {
      li.list[i]={...li.list[i],commit:'true'}
      const lii=await pricemodel.findOne({name:req.body.event})
      lii.list[i]={...lii.list[i],commit:'true'}
      await pricemodel.findOneAndUpdate({name:req.body.event},{list:lii.list});
    }
    else if(!('commit' in li.list[i]) && 'disagree' in li.list[i] && li.list[i].disagree>z)
    {
      li.list[i]={...li.list[i],commit:'false'}
      const lii=await pricemodel.findOne({name:req.body.event})
      lii.list[i]={...lii.list[i],commit:'false'}
      await pricemodel.findOneAndUpdate({name:req.body.event},{list:lii.list});
    }
  }
  await pricetemp.findOneAndUpdate({name:req.body.event},{list:li.list});
  res.status(201);
  res.send('hello')
})

router.post('/Add_Answer',async(req,res)=>{
  const filter = { _id: req.body.quesid[0] };
  a=await quesmodel.findOne(filter);
  let con=0
  for(let i=0;i<a.answer.length;i++)
  {
    if(a.answer[i].none==req.body.mail)
    {
      con=1;
      const ans=a.answer.map((v)=>{
        if(v.none==req.body.mail)
        {
          return({none:req.body.mail,option:req.body.quesid[1]})
        }
        else
        {
          return(v)
        }
      })
      const update ={answer:ans}
      await quesmodel.findOneAndUpdate(filter, update);
    }
  }
  if(con===0)
  {
    const update = { answer:[...a.answer,{none:req.body.mail,option:req.body.quesid[1]}]};
    await quesmodel.findOneAndUpdate(filter, update);
  }
  res.status(201);
  res.send('hello')
})

router.post('/check_leader',async(req,res)=>{
  const e=await usersmodel.find({event_name: req.body.event,leader :req.body.mail})
  if(e.length===0)
  {
      res.json({status:"false"});
  }
  else
  {
      res.json({status:"true"});
  }
  res.status(201);
})

router.post('/provide_list',async (req,res)=>{
  const e=await quesmodel.find({event:req.body.event})
  const a=await usersmodel.findOne({event_name:req.body.event})
  let con=false
  let li=[]
  for(let i=0;i<e.length;i++)
  {
    
    if(e[i].answer.length==a.size+1)
    {
      let ans={}
      con=true
      for(let j=1;j<e[i].answer.length;j++)
      {
        if(`${e[i].answer[j].option}` in ans)
        {
          ans[e[i].answer[j].option]+=1
        }
        else
        {
          const q=e[i].answer[j].option
          ans[q]=1
        }
      }
        w=Object.keys(ans)
        maxs=-1
        k=[]
        for(let j=0;j<w.length;j++)
        {
          if(ans[w[j]]>maxs)
          {
            maxs=ans[w[j]]
            k=[w[j]]
          }
          else if(ans[w[j]]===maxs)
          {
            k=[...k,w[j]]
          }
        }
        oop=[]
        for(let j=0;j<e[i].option.length;j++)
        {
          if(k.includes(e[i].option[j].id.toString()))
          {
            oop=[...oop,e[i].option[j].op]
          }
        }
        obj={}
        obj[e[i].subject]=oop
        li.push(obj)
    }
    
  }
  if(con===false)
  {
    res.json({found:"false"})
  }
  else
  {
    res.json({found:"true",list:li})
  }
  res.status(201);
})

router.post('/commit1',async (req,res)=>{
  filter={name:req.body.event}
  update={phase:req.body.phase}
  await joinmodel.updateMany(filter,update);
  res.status(201);
  res.send('hello')
})

router.post('/check',async (req,res)=>{
  const tokens = req.body.token;
  let logged=false
  if(tokens==='')
  {
    res.json({loggedin:"false"})
  }
  else
  {
    if(req.session.isloggedin&&req.session.isloggedin===true)
    {
      res.json({loggedin:"true"})
    }
    else
    {
    event.find({token:tokens}).then(data=>
      {
        if(Object.keys(data).length>0)
        {
          logged=true
        }
        else
        {
          logged=false
        }
        if(logged==true)
        {
          req.session.isloggedin=true
          req.session.mail=req.body.mails
        }
        if(req.session.isloggedin&&req.session.isloggedin===true)
        {
          res.json({loggedin:"true"})
        }
        else
        {
          res.json({loggedin:"false"})
        }
      });
    }
    }
  }
  )

  router.post('/StoreProgress',async (req,res)=>{
    a1=await usersmodel.findOne({event_name:req.body.Eventname})
    if(a1.leader===req.body.leaders)
    {
      var today = new Date();
      b=await progress.findOne({event:req.body.Eventname})
      if(b===null)
      {

        const q=new progress({event:req.body.Eventname, list:[{"title":req.body.title,"text":req.body.text,'date':(today.getUTCDate()+'-'+parseInt(today.getUTCMonth()+1)+'-'+today.getUTCFullYear()),'time':(today.getUTCHours() + ":" + today.getUTCMinutes())}]})
        await q.save()
      }
      else
      {
        const obj=[...b.list,{'title':req.body.title,'text':req.body.text,'date':(today.getUTCDate()+'-'+parseInt(today.getUTCMonth()+1)+'-'+today.getUTCFullYear()),'time':(today.getUTCHours() + ":" + today.getUTCMinutes())}]
        await progress.updateMany({name:req.body.event},{list:obj});
      }
    }
    res.status(201);
    res.send('hello')
  })

router.post('/fetchProgress',async (req,res)=>{
  const e=await progress.findOne({event:req.body.Eventname})
  if(e!==null)
  res.json({list:e.list})
  res.status(201)
})
module.exports=router;