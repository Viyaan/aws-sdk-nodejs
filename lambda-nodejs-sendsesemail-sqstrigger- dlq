var aws = require('aws-sdk');
const util = require('util');
const sqs = new aws.SQS();

var ses = new aws.SES({region: 'us-east-1'});

exports.handler = function(event, context) {
event.Records.forEach(function(record) {
    var body = record.body;
    console.log(body);
	throw new Error('Ran out of coffee');

	var eParams = {
		Destination: {
			ToAddresses: ["awsgeeky@gmail.com"]//give the email ID which is verified by SES
		},
		Message: {
			Body: {Text: {
				Data: body
				}
			},
			Subject: {  Data: "mail from ses"}
		},
		Source: "awsgeeky@gmail.com" //give the email ID which is verified by SES
	};

	console.log('===SENDING EMAIL===');

	var email = ses.sendEmail(eParams, function(err, data){
		if(err) console.log(err);
		else {
			console.log("===EMAIL SENT===");
			console.log(data);
			console.log("EMAIL CODE END");
			console.log('EMAIL: ', email);
			context.succeed(event);
		}
	});
});
};
