import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import "./index.css";
import AddLabel from './pages/AddLabel';
import AddNewSection from './pages/addNewSection';
import AddTahsimlable from './pages/AddTashimlabel';
import Home from './pages/Home';
import Label from './pages/Label';
import LabelCost from './pages/LabelCost';
import ListCosts from './pages/ListCosts';
import ManageCosts from './pages/ManageCosts';
import TahsimLable from './pages/Tahsimlabel.';
import TashimLog from './pages/TashimLog';
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
        <Route exact path="/manageCosts" component={ManageCosts} />
        <Route exact path="/listCosts" component={ListCosts} />
        <Route exact path="/tahsimLabel" component={TahsimLable} />
        <Route exact path="/addTahsimlable" component={AddTahsimlable} />
        <Route exact path="/labelCost" component={LabelCost} />
        <Route exact path="/tahsimLog" component={TashimLog} />
      </Switch>
    </Router>
  );
}

export default App;
