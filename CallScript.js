// This is a sample of how to call another script file.

// If your file is "Cellsynt" (in homeyscript.homey.app)

// The parameters is used in the script (Cellsynt in this case):
// args[0] = to 
// args[1] = message 

async function sms(to, message) {
    let hs = await Homey.apps.getApp({ id: "com.athom.homeyscript" });
    var r = await hs.apiPost("script/Cellsynt/Run", [to, message]); //Input parameters
    console.log(r.returns);
}

await sms("0700000000", "Hello 🎂!");
