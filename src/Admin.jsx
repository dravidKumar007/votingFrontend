import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [display1, setdisplay1] = useState('block');
  const[display2, setdisplay2] = useState('none');
  const [token, setToken] = useState('');
  const [party, setParty] = useState([]);
  const [newPartyName, setNewPartyName] = useState('');
  const [deletePartyName, setDeletePartyName] = useState('');

  const login = async (e) => {
    e.preventDefault();
    if (name === 'admin' && password === 'admin@123') {
      try {
        // Request token
        const tokenResponse = await axios.get('http://localhost:3000/api/auth/token', {
          params: {
            email: 'admin@gmail.com',
            password: 'admin@123'
          }
        });
        setToken(tokenResponse.data.token);
        setdisplay1('none');
        setdisplay2('block');

        // Fetch party data
        const partyResponse = await axios.get('http://localhost:3000/api/admin/getparty', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.token}`,
          },
        });

        const rows = partyResponse.data['0'].map((name, index) => ({
          name: name,
          votes: partyResponse.data['1'][index],
        }));

        setParty(rows);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Invalid credentials');
    }
  };

  const handleAddParty = async (e) => {
    e.preventDefault();
    try {
     var res= await axios.post('http://localhost:3000/api/admin/addparty', { partyName: newPartyName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setNewPartyName('');
      const partyResponse = await axios.get('http://localhost:3000/api/admin/getparty', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const rows = partyResponse.data['0'].map((name, index) => ({
        name: name,
        votes: partyResponse.data['1'][index],
      }));
      setParty(rows);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteParty = async (e) => {
    e.preventDefault();
    try {
     var res= await axios.delete('http://localhost:3000/api/admin/deleteparty', { partyName: deletePartyName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setDeletePartyName('');
      const partyResponse = await axios.get('http://localhost:3000/api/admin/getparty', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const rows = partyResponse.data['0'].map((name, index) => ({
        name: name,
        votes: partyResponse.data['1'][index],
      }));
      setParty(rows);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='log' style={{ display: display1 }}>
        <center>
          <form onSubmit={login}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">NAME :</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="password">PASSWORD :</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className='logbutton' type="submit">Submit</button>
          </form>
        </center>
      </div>
<div style={{display:display2}}>
      <center>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {party.map((row, index) => (
                <tr key={index}>
                <td>{row.name}</td>
                <td>{row.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <form className='add' onSubmit={handleAddParty}>
          <input
            type="text"
            placeholder='Enter party name'
            value={newPartyName}
            onChange={(e) => setNewPartyName(e.target.value)}
            />
          <button type='submit'>Add Party</button>
        </form>

        <form className='delete' onSubmit={handleDeleteParty}>
          <input
            type="text"
            placeholder='Enter party name'
            value={deletePartyName}
            onChange={(e) => setDeletePartyName(e.target.value)}
            />
          <button type='submit'>Delete Party</button>
        </form>
      </center>
            </div>
    </>
  );
};

export default Admin;

