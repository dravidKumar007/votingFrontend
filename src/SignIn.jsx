
import { useState } from "react";
import './form.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [check, setCheck] = useState("");
  const [message, setMessage] = useState("error");
  const [style, setStyle] = useState("none");
  const [isDisable, setisDisable] = useState(false);
  const signIn = (e) => {
    e.preventDefault();

    if (check !== password) {
      setMessage('password is not match with check password ')
      setStyle('block')
      return;
    }

    var data = {
      name: name,
      email: email,
      password: password
    }
    console.log(data);

    setisDisable(true);

    axios.post("https://votingbackend-qff5.onrender.com/api/users/signin", data).then(
      (res) => {
        console.log(res.data)
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        navigate("/")
      }
    ).catch((err) => {
      console.log(err.response.data.message || err.response.statusText);
      setMessage(err.response.data.message || err.response.statusText)
      setStyle('block');
      setisDisable(false);
    })

  }

  return (
    <div>

      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        zIndex: '1',
        position: 'absolute',
        top: '0',
        left: '0',
        display: style
      }}>

        <span className="dialogBox" >

          <h4>
            error
          </h4>

          <p>{message}</p>
          <div>

            <button onClick={() => { setStyle("none") }}>
              Ok
            </button>
          </div>
        </span>

      </div>

      <div className='border'>
        <center>

          <form onSubmit={signIn}>

            <h1 >SignIn</h1>
            <div className='form'>

              <label htmlFor="name">Name :</label>
              <input required type="text" name="name" value={name} onChange={e => setName(e.target.value)} />

              <label htmlFor="email">Email : </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password : </label>
              <input
                required
                type="password"
                name="password"
                value={password}
                width="10px"
                onChange={e => setPassword(e.target.value)}
              />
              <label htmlFor="check">Check Password : </label>
              <input required type="password" name="check" id="" value={check} onChange={e => setCheck(e.target.value)} />

            </div>
            <button type="submit" disabled={isDisable} className='submit'>Submit</button>

          </form>
          <p className="link">
            Already have an account <Link to="/login">Login</Link>
          </p>



        </center>
      </div>
    </div>
  )
}

export default SignIn
