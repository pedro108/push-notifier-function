var OneSignal = require('onesignal-node');

module.exports = function (context, req) {
    try {
        const oneSignalClient = new OneSignal.Client({
            userAuthKey: "NTExYjg3YWItZTI1OS00YjFlLWFlNDYtNmQ0NDg1OTBlMzAz",
            app: {
                appId: "30ca6c3b-0cb3-4a92-a35e-c80d27a4f923",
                appAuthKey: "MTFmNTU5NjgtMGQyMS00MWYyLTljZTQtYTE3N2MzMDVmM2Zk"
            }
        });
        if (req.body && req.body.name) {
            const notification = new OneSignal.Notification({
                contents: {
                    en: `Notificando ${req.body.name}`
                },
                included_segments: ["Active Users"],
            });
            oneSignalClient.sendNotification(notification, function(err, httpResponse, data) {
                if (err) {
                    context.res = {
                        // status: 200, /* Defaults to 200 */
                        body: {"name": "Notificação enviada para " + req.body.name, "data": data}
                    };
                } else {
                    context.res = {
                        status: httpResponse.statusCode,
                        body: {"name": "Erro ao enviar notificação para " + req.body.name, "data": JSON.stringify(data)}
                    };
                }
                context.done();
            });
                }
        else {
            context.res = {
                status: 400,
                body: "Please pass a name in the request body"
            };
            context.done();
        }
    } catch (err) {
        context.res = {
            status: 500,
            error: err
        }
        context.done();
    }
};
