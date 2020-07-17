import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navigation from "./components/navigation.component";
import ExistingList from "./components/existing-list.component";
import Editcontact from "./components/edit-contant.component";
import Newcontact from "./components/new.component";
import Opencontact from "./components/open-contact.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navigation />
      <br/>
        <Route path="/" exact component={ExistingList} />
        <Route path="/existing" component={ExistingList} />
        <Route path = "/new/create" component = {Newcontact} />
        <Route path = "/new/edit/:id" component = {Editcontact} />
        <Route path = "/new/open/:id" component = {Opencontact} />
      </div>
    </Router>
  );
}

export default App;
