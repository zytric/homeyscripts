// Send SMS for 0,5kr/sms
// https://www.cellsynt.com/pdf/Cellsynt_SMS_gateway_HTTP_interface_(Swedish).pdf

async function sms(destination, text, originator = "46700000000") {
    let username = "username";
    let password = "password";
    let url = `https://se-1.cellsynt.net/sms.php?username=${username}&password=${password}&destination=${destination}&type=text&charset=UTF8&originatortype=alpha&originator=${originator}&text=${encodeURIComponent(text)}`;
    return fetch(url).then(function(response) {
        return response.text()
    }).then(function(html) {
        return html;
    });
}

await sms("0700000000", "Hejsan!");
