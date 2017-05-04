var dummyjson = require('dummy-json');
var AWS = require("aws-sdk");
var uuid = require('node-uuid');

var docClient = new AWS.DynamoDB({ region: 'us-east-1', endpoint: 'dynamodb.us-east-1.amazonaws.com' });

var myHelpers = {
    osVersion: function () {
        return dummyjson.utils.randomArrayItem(['10.1.1', '4.0.3']);
    },
};

for (i = 0; i < 100; i++) {

    var template =
'{\
"Hits": {{int 1 10}},\
"device": {\
    "make": "{{company}}",\
    "platform": {\
    "name": "Android",\
    "version": "{{osVersion}}"\
    },\
    "location": {\
    "latitude": "{{lat}}",\
    "longitude": "{{long}}",\
    "country": "{{countryCode}}"\
    }\
},\
"session": {\
    "session_id": "{{guid}}",\
    "start_timestamp": "{{int 141538900200 151530089200 \'00\'}}",\
    "stop_timestamp": "{{int 1415380009200 1515380009200 \'00\'}}"\
}\
}';

    var payload = dummyjson.parse(template, { helpers: myHelpers }); 
    console.log(payload);

    var params = {
        TableName: 'web_analytics',
        Item: {
            "page_id": {
                S: uuid.v4()
            },
            "activity_dt": {
                S: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            },
            "payload": {
                S: payload
            }
        },
        ReturnValues: 'NONE',
        ReturnConsumedCapacity: 'NONE',
        ReturnItemCollectionMetrics: 'NONE',
    };

    docClient.putItem(params, function (err, data) {
        if (err) console.log(err); 
        else {
            console.log("Data inserted");
        }
    });


};

