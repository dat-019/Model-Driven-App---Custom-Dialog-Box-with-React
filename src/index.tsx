import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ABCustomDialog from './App';
//import reportWebVitals from './reportWebVitals';

//following code parses url of dialog to extract required data including "data" parameter
const queryString = window.location.search.substring(1);
let params: any = {};
const queryStringParts = queryString.split("&");
for (let i = 0; i < queryStringParts.length; i++) {
  const pieces = queryStringParts[i].split("=");
  params[pieces[0].toLowerCase()] = pieces.length === 1 ? null : decodeURIComponent(pieces[1]);
}
 
//deserializing of the data parameter
const data = JSON.parse(params.data);

ReactDOM.render(
  <React.StrictMode>
    <ABCustomDialog sessionId={data.sessionId} text={data.text}  date={new Date(data.date)} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
