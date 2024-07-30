import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./VotingPage.css"
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const VotingPage = () => {

    const navigate = useNavigate();
    const [token,setToken]=useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const[name,setName] = useState('');
   const [party,setParty] = useState([]);
   const [selectedValue, setSelectedValue] = useState(null);
   const [disabled, setDisabled] = useState(false);
   
   useEffect( () => {
      const loadData =  () => {
    
       const saveName = localStorage.getItem('name');
       const savedEmail = localStorage.getItem('email');
       const savedPassword = localStorage.getItem('password');
       
       if (savedEmail !== null ) {
         console.log("working" + saveName);
           console.log("working" + savedEmail);
           console.log("working" + savedPassword);


   
   
         setName(saveName);
         setEmail(savedEmail);
         setPassword(savedPassword);

         getToken();
       }else{
         navigate('/login');
       }
     };

     
loadData();

 async function getToken(){
  var data = {
    name:name,
    email:email
  }

  axios("https://votingbackend-qff5.onrender.com/api/auth/token",{param:data}).then((response)=>{
    console.log(response.data);
    setToken(response.data.token);

    axios.get('https://votingbackend-qff5.onrender.com/api/voting/getVoter', {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    }).then((response)=>{


    setParty(response.data[0])
 console.log(response.data[1][0])
 console.log(localStorage.getItem('email') )
        

if (response.data[1].some(emailList => emailList.includes( localStorage.getItem('email')))) {
    console.log("contain");
    navigate('/success');
} else {
    console.log("Email not found in any party's email list");
}



        
    }).catch((error)=>{console.log(error);})
  }).catch(err=>console.log(err.message))

}

    }, []);


 function castVote(e){
  e.preventDefault();

  setDisabled(true)

var data={
 partyName:selectedValue,
 voterEmail:email
};

axios.post('https://votingbackend-qff5.onrender.com/api/voting/castvote',data, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then(response=>{console.log(response.data);
  navigate('/success')
}).catch(e=>{console.log(e);setDisabled(false)})
 }   

function logout(){

  localStorage.removeItem('email');
  localStorage.removeItem('name');
  localStorage.removeItem('password');

  navigate('/login');


}
  
  return (
    <>
    <div className='nav'>
     <div>

      <h1>
      &nbsp;Voting page
      </h1>
     </div>

      <div className='right'>
       <button className="menu-item">
          sign in as {name} &#9660; 
       </button>
       <ul className="dropdown">
                    <li>
                      <p onClick={logout} >
                     LogOut
                      </p>
                      </li>
                    <li>
                      <p onClick={()=>{
                        navigate('/login');
                      }}>
                     Another Account
                        </p>
                        </li>
                </ul>
      </div>
    </div>


<Routes>

<Route path="/" element={
<div className='body'>
<form onSubmit={castVote}>

<center>

  <table>

{party.map((option, index) => (
  
  <div key={index} style={{margin:'20px'}}>
    <tr>
      <td>

            <input
              type="radio"
              id={`radio-${index}`}
              name="options"
              value={option}
              checked={selectedValue === option}
              onChange={ (event) => {
                setSelectedValue(event.target.value);
              }}
              />
              </td>
              <td>

            <label htmlFor={`radio-${index}`}>{option}</label>
              </td>
              </tr>
          </div>
        ))}
        </table>
 
        <button
        style={disabled ? {backgroundColor:'red',cursor:'not-allowed'} : {}}
        onClick={() => alert('Button Clicked')}
        className='castVote'
        disabled={disabled}
          > 
          {disabled ? 'Wait..':'Cast Vote'}
          </button>


 
        </center>
        </form>
  
</div>
} />

<Route path='/success' element={
  <div style={{margin:"100px",color:"green"}}>
    <center>
    Your vote has been casted successfully
    </center>  
  </div>
} />
</Routes>

    </>
  )
}

export default VotingPage
