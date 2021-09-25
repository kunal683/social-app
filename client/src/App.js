import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Menubar from './components/Menubar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  return (
    <Router>
      <Menubar />
      <Route exact path = "/" component = {Home}/>
      <Route exact path = "/Home" component = {Home}/>
      <Route exact path = "/Login" component = {Login}/>
      <Route exact path = "/Register" component = {Register}/>
    </Router>
  );
}

export default App;
