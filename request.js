var http = require("http");
var request = require("request");

module.exports = {
    post: function(host, path, jsonCode) {

        var promise = new Promise( (resolve, reject) => {
            
            request({
                url: host + path,
                method: "POST",
                headers: {
                "content-type": "application/json"
                },
                json: jsonCode
            },
            function(err, res, data) {
                // console.log('err', err)
                // console.log('res', res)
                // console.log('data', data)
                if (!err && res.statusCode == 200) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            }
            )

        });

        return promise;
    },
    postFormEncoded: function(host, path, params) {

        var promise = new Promise( (resolve, reject) => {
            
            request({
                url: host + path,
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                form: params
            },
            function(err, res, data) {
                // console.log('err', err)
                // console.log('res', res)
                // console.log('data', data)
                if (!err && res.statusCode == 200) {
                    resolve(data);
                }
                else {
                    reject({ error: err, status : res.statusCode });
                }
            }
            )

        });

        return promise;
    }
}