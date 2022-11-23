import React from 'react';
import reactDom from 'react-dom';
import App from './app';
import '../src/styles/main.scss';
import '../src/styles/normalize.css';
import '../src/styles/reset.css';
import './i18n';


reactDom.render(<App />, document.getElementById('root'));
