import React, { Component } from "react";
import axios from "axios";
// import "./App.css";
import { HashRouter, Route, withRouter } from "react-router-dom";
import DisplayList from "./components/DisplayList";
import EditForm from "./components/EditForm";

class App extends Component {
  state = {
    posts: [],
    currentPost: {}
  };
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
      const posts = res.data;
      this.setState({ posts: posts });
    });
  }
  clickHandler = post => {
    this.setState({
      ...this.state,
      currentPost: post
    });
  };

  submitHandler = post => {
    let updatedState = this.state.posts.slice();
    this.setState({
      ...this.state,
      posts: updatedState.map(curPost =>
        curPost.id === post.id ? post : curPost
      )
    });
    this.props.history.push("/#");
  };

  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          <Route
            path="/"
            exact
            component={() => (
              <DisplayList
                posts={this.state.posts}
                onClick={this.clickHandler}
              />
            )}
          />
          <Route
            path="/edit/:id"
            exact
            component={() => (
              <EditForm
                post={this.state.currentPost}
                submit={this.submitHandler}
              />
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

export default withRouter(App);
