import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import DataProvider from "./DataProvider";
import Table from "./Table";
import PostForm from "./PostForm";
import LoginForm from "./LoginForm";


function Custrouter() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
          <li>
            <Link to='/subreddits'>Subreddits</Link>
          </li>
        </ul>

        <hr />

        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route path='/posts' component={PostList} />
        <Route path='/subreddits' component={SubredditList} />

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

function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

function PostList() {
  return (
    <div>
      <DataProvider endpoint="api/v0/posts" />
      <Table />
      <PostForm endpoint="api/v0/posts/" api_url="api2/" />
    </div>
  );
}

function SubredditList() {
  return (
    <div>
     <DataProvider endpoint="api/v0/subreddits" />
     <Table />
    </div>
  )
}


export default Custrouter;