import './App.css'
import Login from './component/Login/Login';
import Home from './component/home/Home';
import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import SignUp from './component/Singup/Signup';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' element={ <Home /> }></Route>
          <Route exact path='/login' element={ <Login /> }></Route>
          <Route path='/signup' element= { <SignUp />}></Route>
        </Switch>
    </Router>
  )
}

export default App
