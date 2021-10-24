import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect } from "react";
import csc from 'country-state-city';
import { Country }  from 'country-state-city';
import Select from 'react-select';

function App() {
  const [splash, setSplash] = useState('splashEnable');
  const [profile, setProfile] = useState('developer');
  const [location, setLocation] = useState('india');
  const [items,setItems] = useState([]);
  let [menus, setMenus] = useState(false);
  let [fetched,setFetched]=useState(false);
  let [start, setStart] = useState(0);
  let [end,setEnd]=useState(3);
var menuChange=()=>{
  setMenus(!menus)
}
if(fetched)
console.log(items)
  useEffect(()=>{
    setTimeout(() => {
      setSplash('splashDisable')
    }, 3000);
 
  })
  
const countries=Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.id,
    ...country 
  }))
  var next=()=>{
    setEnd(end+3)
    setStart(start+3)
    searchClicked()
  }
  var prev=()=>{
    setEnd(end-3)
    setStart(start-3)
    searchClicked()
    
  }
var searchClicked=()=>{
  setFetched(false);
  setItems([]);
  fetch("https://staging.mapout.com/mapout-node/joblist/monster-jobs?keyword="+profile+"&location="+location)
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result.jobs.filter((job)=>job!==null).slice(start,end))
            setFetched(true);
          },
          (error) => {
           setItems(error)
          }
        )
    }

  
  return (
    <div>
    <div className={splash}></div>
      <div className="nav">
      
      <div className={menus?'menuDivActive':'menuDiv'}>
        
      <h6 className="menu" onClick={menuChange}>Menu</h6>
        </div>
        </div>

    <div className="mainDiv">
      <div style={{display:"flex",alignItems:"baseline",justifyContent: "space-evenly",width:"100%"}}>
      <div style={{display:"flex",alignItems:"center"}}>
      <p>Keyword:</p> 
      <input type="text" onChange={e => setProfile(e.target.value)}></input>
      </div>
      <div style={{width:"200px",display:"flex",alignItems:"center"}}>
        
      <p>Location:</p>
     
        <select onChange={(e) => {
            setLocation(e.target.value)
          }}>
          {countries.map((country)=>(
            
            <option value={country.label} key={country.label}>{country.label}</option>
          ))}
        </select>
        </div>
        
      <button onClick={searchClicked}>Search</button>
      </div>
      
    <div className="cards">  
  <svg onClick={prev} display={fetched?"block":"none"} width="24" height="24" fill-rule="evenodd" clip-rule="evenodd"><path d="M22 24l-18-12 18-12v24zm-19-24v24h-1v-24h1zm2.803 12l15.197 10.132v-20.263l-15.197 10.131z"/></svg>
      
    {items && fetched && items.map((item)=>{
      if(fetched && items.length>0)
          return <div className="card" key={item.title}>
            <p>Title: {item.title}</p>
            <p>Experience Required: {item.experience}</p>
            <p>Location: {item.location}</p>
            <p>Industry: {item.industry}</p>
            <a href={item.apply_link}>Apply here</a>
          </div>
          })} 
      <svg onClick={next} display={fetched?"block":"none"} width="24" height="24" fill-rule="evenodd" clip-rule="evenodd"><path d="M2 24l18-12-18-12v24zm19-24v24h1v-24h-1zm-2.803 12l-15.197 10.132v-20.263l15.197 10.131z"/></svg>
        
   </div>
    </div>
    </div>
  );
}

export default App;
