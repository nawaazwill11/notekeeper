import axios from 'axios';

class Utility {
    request = {
        get: function(url) {
            return axios.get(url);
        },
        post: function (url, data) {
            return axios.post(url, data);
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