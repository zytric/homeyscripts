// Send SMS for 0,5kr/sms
// https://www.cellsynt.com/pdf/Cellsynt_SMS_gateway_HTTP_interface_(Swedish).pdf

// Success response:
// OK: 92dff27302b754424242fb204620dc18 > Will return: 92dff27302b754424242fb204620dc18

// Follow up:
// https://example.org/delivery-receipts?trackingid=92dff27302b754424242fb204620dc18&status=delivered&destination=0046700123123

async function sms(destination, text, originator = "46700000123") {
    let username = "username";
    let password = "password";
    let url = `https://se-1.cellsynt.net/sms.php?username=${username}&password=${password}&destination=${destination}&type=text&charset=UTF8&originatortype=alpha&originator=${originator}&text=${encodeURIComponent(text)}`;
    return fetch(url).then(function(response) {
        return response.text()
    }).then(function(html) {
        console.log(html);
        let trackingId = html.indexOf("OK: ") !== -1 ? html.slice(4).trim() : null;
        if (trackingId)
            return trackingId;
        return null;
    });
}

await sms("0700123456", "Hello!");
