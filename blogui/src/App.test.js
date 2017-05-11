import React from 'react';
import ReactDOM from 'react-dom';
import BlogContainer from "./BlogContainer";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BlogContainer />, div);
});
