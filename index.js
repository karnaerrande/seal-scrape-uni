const fetch = require("node-fetch");
const url = "https://en.wikipedia.org/w/api.php";


//Craft route to return id of wikipedia page with name
const initialString = (name) => {
    var temp = ''
    var params = {
        action: "query",
        list: "search",
        srsearch: name,
        format: "json"
    };

    temp = url + "?";
    Object.keys(params).forEach(function (key) { temp += "&" + key + "=" + params[key]; });
    return temp;
}

//Craft img query using id
const imgString = (id) => {
    var temp = ''
    var params = {
        action: 'parse',
        pageid: id,
        prop: 'text',
        format: 'json'
    }
    temp = url + "?";

    Object.keys(params).forEach(function (key) { temp += "&" + key + "=" + params[key]; });
    return temp;
}

//Accepts a string that will be converted into a wikipedia pageid -> image object
const getWikiImg = (temp) => new Promise((resolve, reject) => {
    fetch(temp).then(response => response.json())
        .then(data => {
            var post = imgString(data.query.search[0].pageid)
            fetch(post).then(dat => dat.json())
                .then(res => {
                    var arr = Object.values(res.parse.text);
                    var val = arr[0].indexOf('<img')
                    var val2 = arr[0].indexOf('/>')
                    resolve(arr[0].substring(val, val2 + 2))
                })
        })
})

async function getUniSeal(value) {
    var x = await getWikiImg(initialString(value))
    console.log(x)
}

function main() {
    var arr = ['Arizona State University', 'Baylor University', 'University of Washington', 'University of Waterloo', 'University of Wisconsin-Madison', 'Vanderbilt University', 'Villanova University', 'Washington University in St. Louis', 'Wayne State University', 'Western University', 'William Marsh Rice University', 'Yale University', 'York University']

    for (var i = 0; i < arr.length; i++) {
        getUniSeal(arr[i])
    }
}


main();