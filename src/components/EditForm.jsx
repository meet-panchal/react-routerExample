import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class EditForm extends Component {
  state = {
    currentPost: {},
    loading: true
  };
  componentDidMount() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`
      )
      .then(res => {
        const post = res.data;
        this.setState({ currentPost: post, loading: false });
      });
  }

  changeHandler = event => {
    this.setState({
      ...this.state,
      currentPost: { ...this.state.currentPost, title: event.target.value }
    });
  };

  render() {
    return this.state.loading ? (
      <div
        className="spinner-border text-warning"
        role="status"
        style={{ margin: " 75px 0px 0px 120px" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <div>
        <textarea
          cols="30"
          rows="5"
          value={this.state.currentPost.title}
          onChange={this.changeHandler}
        />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => this.props.submit(this.state.currentPost)}
        >
          Submit
        </button>
      </div>
    );
  }
}
export default withRouter(EditForm);
