import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Utility from './components/Utility';
import $ from 'jquery';

window.onload = function () {
    const util = new Utility();
    
    util.ajax.get('http://localhost:5000/api/loadData')
        .then((data) => {
            data = util.parseData.json(data);
            if (data) {
                ReactDOM.render(
                <React.StrictMode>
                    <App data={data}/>,
                </React.StrictMode>,
                document.getElementById('container')
                );
            } 
            else {
                console.log("Faulty data");
                showError();
            }
        })
        .catch((error) => {
            console.error(error);
            showError();
        })
    
}

function showError() {
    $('body').html(`<h1>${'500 - Server error occured'}</h1>`);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
