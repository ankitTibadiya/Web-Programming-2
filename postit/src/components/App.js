import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./dashboard/Dashboard";
import PostDetails from "./posts/PostDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CreatePost from "./posts/CreatePost";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/post/:id" component={PostDetails} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/createpost" component={CreatePost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
