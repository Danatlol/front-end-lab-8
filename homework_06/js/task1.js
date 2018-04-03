const http = {
    requestObject: new XMLHttpRequest(),

    get: function (url) {
        let self = this;
        return new Promise(function (resolve, reject) {            
            self.requestObject.open("GET", url);
            self.requestObject.responseType = "json";
            self.requestObject.onreadystatechange = function () {
                if (self.requestObject.readyState === 4 && self.requestObject.status === 200) {
                    resolve(self.requestObject.response);
                }
            };
            self.requestObject.onerror = function (eve) {
                reject(eve);
            };
            self.requestObject.send(null);
        });
    },

    post: function (url, requestBody) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.requestObject.open("POST", url);
            self.requestObject.responseType = "text";
            self.requestObject.onreadystatechange = function () {
                if (self.requestObject.readyState === 4 && self.requestObject.status === 200) {
                    resolve(self.requestObject.response);
                }
            };
            self.requestObject.onerror = function (eve) {
                reject(eve);
            };
            self.requestObject.send(requestBody);
        });
    }
};