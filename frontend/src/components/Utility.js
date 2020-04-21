class Utility {
    ajax = {
        /**
         * @param {String} method 
         * @param {String} url 
         * @param {Boolean} async 
         */
        get: function (url, async=true) {
            return new Promise((resolve, reject) => {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        resolve(xmlhttp.response);
                    }
                    else if(xmlhttp.readyState === 4 && xmlhttp.status === 500) {
                        reject('500 - Server Error Occured');
                    }
                }
                xmlhttp.open('GET', url, async);
                xmlhttp.send();
            });
        }
    }
    parseData = {
        json: function(data) {
            data = JSON.parse(data);
            if (typeof(data) !== 'object') return false;
            return data;
        }
    }
}

export default Utility;