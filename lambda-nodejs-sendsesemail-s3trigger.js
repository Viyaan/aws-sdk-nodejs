var aws = require('aws-sdk');
const util = require('util');
const s3 = new aws.S3();

var ses = new aws.SES({region: 'us-east-1'});

exports.handler = function(event, context) {
	console.log("Incoming: ", event);
	 // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    const srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    const srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));


	var eParams = {
		Destination: {
			ToAddresses: ["awsgeeky@gmail.com"]//give the email ID which is verified by SES
		},
		Message: {
			Body: {Text: {
				Data: "File Uploaded in Bucket "+srcBucket +" File Name "+ srcKey
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
};