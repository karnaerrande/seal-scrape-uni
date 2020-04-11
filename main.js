const url = "https://en.wikipedia.org/w/api.php";
const fetch = require("node-fetch");

// Demonstational purpose, the function here is redundant
function getJSON(URL) {
    return fetch(URL);
}

const getWikiPage = async (name, func) => {
    var temp = ''
    var params = {
        action: "query",
        list: "search",
        srsearch: name,
        format: "json"
    };

    temp = url + "?origin=*";
    Object.keys(params).forEach(function (key) { temp += "&" + key + "=" + params[key]; });

    getJSON(temp).then(response =>
        response.json().then(data => ({
            data: data.query.search[0].title
        })
        ).then(res => {
            return func(res.data)
        }
    ));
    
}

getImageURL = result =>{
    console.log(result)
    return result
}

function main(){
    var uni = getWikiPage('Harvard', getImageURL)

}


main();