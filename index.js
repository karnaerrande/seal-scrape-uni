const fetch = require("node-fetch");
const url = "https://en.wikipedia.org/w/api.php";
const fs = require('fs');

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
                    arr[0] = arr[0].substring(arr[0].indexOf('colspan="2"'))
                    var val = arr[0].indexOf('<img')
                    var val2 = arr[0].indexOf('/>')
                    resolve(arr[0].substring(val, val2 + 2).replace("//","https://"))
                })
        })
})

async function getUniSeal(value) {
    var x = await getWikiImg(initialString(value))
    fs.appendFileSync('./test/unis.html',x)
}

async function getUniSeal(value,i) {
    setTimeout(
        async function() {
            var x = await getWikiImg(initialString(value))
            fs.appendFileSync('./test/unis.html',x)
        }
        .bind(this),
        3000*i
    );
}

function main() {
    var arr = ['Arizona State University', 'Baylor University', 'Binghamton University', 'Boston College', 'Boston University', 'Bowling Green State University', 'Brown University', 'Carnegie Mellon University', 'Central European University', 'Claremont Graduate University', 'Columbia University', 'Cornell University', 'Dalhousie University', 'DePaul University', 'Duke University', 'Duquesne University', 'Emory University', 'Florida State University', 'Fordham University', 'Georgetown University', 'Ghent University', 'Graduate Center of the City University of New York', 'Harvard University', 'Indiana University Bloomington', 'Johns Hopkins University', 'Katholieke Universiteit Leuven', 'Kings College London', 'Loyola University Chicago', 'Marquette University', 'Massachusetts Institute of Technology', 'McMaster University', 'Michigan State University', 'New York University', 'Northwestern University', 'Ohio State University', 'Pennsylvania State University', 'Princeton University', 'Purdue University', 'Rutgers University', 'Saint Louis University', 'Southern Illinois University Carbondale', 'Stanford University', 'Stony Brook University', 'Syracuse University', 'Temple University', 'The Catholic University of America', 'The New School', 'The University of Manchester', 'The University of Sydney', 'Tulane University', 'University at Buffalo', 'University of Alberta', 'University of Arizona', 'University of Arkansas', 'University of Bristol*', 'University of British Columbia', 'University of Calgary', 'University of California, Berkeley', 'University of California, Davis', 'University of California, Irvine', 'University of California, Los Angeles', 'University of California, Riverside', 'University of California, San Diego', 'University of California, Santa Barbara', 'University of California, Santa Cruz', 'University of Chicago', 'University of Cincinnati', 'University of Colorado Boulder', 'University of Connecticut', 'University of Dallas', 'University of Florida', 'University of Georgia', 'University of Groningen', 'University of Guelph', 'University of Hawaii at Hilo', 'University of Hawaii at Manoa', 'University of Illinois at Chicago', 'University of Illinois at Urbana-Champaign', 'University of Iowa', 'University of Kansas', 'University of Kentucky', 'University of Maryland, College Park', 'University of Massachusetts Amherst', 'University of Memphis', 'University of Miami', 'University of Michigan', 'University of Minnesota Twin Cities', 'University of Missouri', 'University of Nebraska, Lincoln', 'University of New Mexico', 'University of North Carolina at Chapel Hill', 'University of Notre Dame', 'University of Oklahoma', 'University of Oregon', 'University of Ottawa', 'University of Pennsylvania', 'University of Pittsburgh', 'University of Reading', 'University of Regensburg', 'University of Rochester', 'University of South Carolina', 'University of South Florida', 'University of Southern California', 'University of St Andrews', 'University of Sussex', 'University of Tennessee', 'University of Texas at Austin', 'University of Toronto', 'University of Utah', 'University of Virginia', 'University of Washington', 'University of Waterloo', 'University of Wisconsin-Madison', 'Vanderbilt University', 'Villanova University', 'Washington University in St. Louis', 'Wayne State University', 'Western University', 'William Marsh Rice University', 'Yale University', 'York University']
    for (var i = 0; i < arr.length; i++) {
        getUniSeal(arr[i],i)
    }
}


main();

