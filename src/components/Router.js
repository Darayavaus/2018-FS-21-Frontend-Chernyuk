import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

function Custrouter() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>

        <hr />

        <Route exact path='/' component={Home} />
        <Route path='/posts' component={PostList} />

      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function PostList() {
  return (
    <div>
      <h2>Post lists</h2>
    </div>
  );
}


export default Custrouter;