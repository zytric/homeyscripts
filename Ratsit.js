String.prototype.between = function (start, stop) {
    var start_pos = this.indexOf(start) + start.length;
    var end_pos = this.indexOf(stop, start_pos);
    return this.substring(start_pos,end_pos)
}

String.prototype.htmlDecode = function () {
    return this
    .replace(new RegExp("&#xE5;", 'g'), "å").replace(new RegExp("&#xC5;", 'g'), "Å")
    .replace(new RegExp("&#xE4;", 'g'), "ä").replace(new RegExp("&#xC4;", 'g'), "Ä")
    .replace(new RegExp("&#xF6;", 'g'), "ö").replace(new RegExp("&#xD6;", 'g'), "Ö");
}

async function sok(firstname, lastname, pid) {
    let urlSok = `https://www.ratsit.se/sok/person?fnamn=${encodeURI(firstname)}&enamn=${encodeURI(lastname)}&gata=&postnr=&ort=&kn=&pnr=${encodeURI(pid)}&tfn=&m=0&k=0&r=0&er=0&b=0&eb=0&amin=0&amax=0&fon=1&typ=2&page=1`;
    return fetch(urlSok).then(function(response) {
        return response.text()
    }).then(function(html) {
        let url = "https://www.ratsit.se/" + html.between("<div class=\"search-list-content\"","</div>").between("<a href=/",">");
        return url;
    });
}

async function details(url) {
    if (url === "https://www.ratsit.se/head")
        return null;
    console.log(url);
    return fetch(url).then(function(response) {
        return response.text()
    }).then(function(html) {
        let address = html.between("<address>","</address>").trim().replace("<br />",",").htmlDecode();
        let birth = html.between("<div class=\"rapport-card__pnr hidden-md-down m-t-5\">","</div>").between("<span>","-").trim();
        let phone = html.between("<div id=\"phone\">","</div>").between("<a href=\"tel:","\"").replace("=","").trim();        
        return { address: address, birth: birth, phone: phone };
    });
}

// Use like this:
var urlDetails = await sok(args[0], args[1], args[2]); // If you dont know the year... "????0101"
var result = await details(urlDetails);
return result;
