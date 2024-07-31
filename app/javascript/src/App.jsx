import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "components/Dashboard";
import { CreateTask, ShowTask, EditTask } from "components/Tasks";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact path="/tasks/:slug/edit" component={EditTask} />
      <Route exact path="/tasks/:slug/show" component={ShowTask} />
      <Route exact component={CreateTask} path="/tasks/create" />
      <Route exact component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;
