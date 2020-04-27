import axios from 'axios';

class Utility {
    request = {
        get: function(url) {
            // return axios.get(url);
            return fetch(url, {mode: 'cors'});
        },
        post: function (url, data) {
            return axios.post(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: data
            });
        }
    }
    parseData = {
        json: function(data) {
            try {
                if (typeof(data) !== 'object') 
                    data = JSON.parse(data);
                return data
            }
            catch(e) {
                console.error(e);
                return false;
            }
        }
    }
}

export default Utility;