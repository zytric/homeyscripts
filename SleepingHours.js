Date.prototype.readableTime = function() {
    return `${("0"+this.getHours()).slice(-2)}:${("0"+this.getMinutes()).slice(-2)}`;
};

async function logs() {
    let capability = [ "alarm_motion", "alarm_contact"];
    let devices = await Homey.devices.getDevices();
    let alerts = [];
    for (var d in devices) {
        let device = devices[d];
        let capObj = _.find(device.capabilitiesObj, function(o) { return capability.includes(o.id); });
        if (!capObj) continue;
        let i = _.find(device.insights, function(o) { return o.id === capObj.id; });
        let insights = await Homey.insights.getLogEntries({id: i.id, uri: i.uri});    
        alerts = _.concat(alerts, _.map(_.filter(insights.values, function (o) { return o.v; }), function(o) { return new Date(o.t); }));
    }
    return _.sortBy(alerts, function(value) {return value;});
}

let startSleeping = new Date();
startSleeping.setHours(2);
startSleeping.setMinutes(0);

let stopSleeping = new Date();
stopSleeping.setHours(5);
stopSleeping.setMinutes(0);

var logs = await logs();
var s = _.last(_.filter(logs, function(o) { return o < startSleeping; })).readableTime();
var e = _.filter(logs, function(o) { return o > stopSleeping; })[0].readableTime();

let sleepHours = `${s} - ${e}`;
setTagValue("SleepHours", {type: "string", title: "SleepHours"}, sleepHours)
return sleepHours;
