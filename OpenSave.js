// Open json file (xxxx.js in your homeyscripts)
async function open(file) {    
    try {
        let hs = await Homey.apps.getApp({ id: "com.athom.homeyscript" });    
        var r = await hs.apiGet("script/"+file, []);        
        return JSON.parse(r.code);
    } catch (e) {
        return null;
    }
}

// Save json file (xxxx.js in your homeyscripts)
async function save(file, obj) {
    let hs = await Homey.apps.getApp({ id: "com.athom.homeyscript" });
    var json = JSON.stringify(obj, null, 2);
    return await hs.apiPut("script/"+file, { code: json });
}
