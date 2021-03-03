import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import "./index.css";
import AddNewSection from './pages/addNewSection';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addNewSection" component={AddNewSection} />
      </Switch>
    </Router>
  );
}

export default App;
