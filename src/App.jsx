import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import "./index.css";
import AddLabel from './pages/AddLabel';
import AddNewSection from './pages/addNewSection';
import Home from './pages/Home';
import Label from './pages/Label';
import UpdateSection from './pages/UpdateSection';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addNewSection" component={AddNewSection} />
        <Route exact path="/updateSection" component={UpdateSection} />
        <Route exact path="/label" component={Label} />
        <Route exact path="/addLabel" component={AddLabel} />
      </Switch>
    </Router>
  );
}

export default App;
