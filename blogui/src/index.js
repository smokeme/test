import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BlogContainer from "./BlogContainer";
import actions from "./BlogActions";

ReactDOM.render(
  <BlogContainer />,
  document.getElementById('root')
);

actions.fetchArticles();