import React, { Component } from "react";
import "./DisplayList.css";
import { Link } from "react-router-dom";

export default class DisplayList extends Component {
  render() {
    return (
      <div>
        <ol>
          {this.props.posts.map(post => (
            <div key={post.id}>
              <li>{post.title}</li>
              <Link
                to={`/edit/${post.id}`}
                className="btn btn-success"
                onClick={() => this.props.onClick(post)}
              >
                Click ME!
              </Link>
            </div>
          ))}
        </ol>
      </div>
    );
  }
}
