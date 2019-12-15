import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./dashboard/Dashboard";
import PostDetails from "./posts/PostDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CreatePost from "./posts/CreatePost";
import Profile from "./auth/Profile";
import PostEdit from "./posts/PostEdit";

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
            <Route path="/profile" component={Profile} />
            <Route path="/postEdit/:id" component={PostEdit} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
