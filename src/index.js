import React from 'react';
import ReactDOM from 'react-dom';

import App from './lib/router.js';

import './static/css/bootstrap.css';


ReactDOM.render(<div className="container top-margin">
                  <App />
                </div>,
                document.getElementById('root'));
