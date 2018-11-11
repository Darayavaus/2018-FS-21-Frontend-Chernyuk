import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import LogInForm from './loginform.js';
import MessageForm from './chit-chat.js';


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/chats'>Chats</Link>
          </li>
        </ul>

        <hr />

        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/chats' component={Chats} />
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

function Profile() {
  return (
    <div>
      <h2>User Profile</h2>
      <LogInForm />
    </div>
  );
}

function Chats({ match }) {
  return (
    <div>
      <h2>Chats</h2>
      <ul>
        <li>
          <Link to={`${match.url}/Chat1`}>Chat #1</Link>
        </li>
        <li>
          <Link to={`${match.url}/Chat2`}>Chat #2</Link>
        </li>
        <li>
          <Link to={`${match.url}/Chat3`}>Chat #3</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:chatId`} render={Chat} />
    </div>
  );
}

function Chat({ match }) {
  return (
    <div>
      <h2>{match.params.chatId}</h2>
      <MessageForm id={match.params.chatId} key={match.params.chatId} />
    </div>
  );
}



export default App;