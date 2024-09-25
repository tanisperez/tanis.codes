var fuse;
var indexed = false;

const searchButton = document.getElementById("search-article");
searchButton.addEventListener("click", displaySearch);

function displaySearch() {
    if (!indexed) {
        buildIndex();
    }
    alert(JSON.stringify(fuse));
}

function buildIndex() {
    fetchJSON("/index.json", function (data) {
        var options = {
            shouldSort: true,
            ignoreLocation: true,
            threshold: 0.0,
            includeMatches: true,
            keys: [
                { name: "title", weight: 0.8 },
                { name: "description", weight: 0.2 }
            ],
        };
        fuse = new Fuse(data, options);
        indexed = true;
    });
}

function fetchJSON(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open("GET", path);
    httpRequest.send();
}