
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import SignIn from './SignIn';
import VotingPage from './VotingPage';
import Admin from "./Admin";

function App() {

  return (
    
         <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login></Login>}>        </Route>
        <Route path="/signIn" element={<SignIn/>}>        </Route>
        <Route path="/admin" element={<Admin/>}>        </Route>

        <Route path="/*" element={<VotingPage/>}>        </Route>

      </Routes>
    </BrowserRouter>
    
  )


}

export default App;
