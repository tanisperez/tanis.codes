var fuse;
var indexed = false;
var searchVisible = false;

var modal = document.getElementById("search-modal");
var searchButton = document.getElementById("search-article");
var searchWrapper = document.getElementById("search-wrapper");
var hideButton = document.getElementById("close-search-button");
var input = document.getElementById("search-query");
var output = document.getElementById("search-results");

modal.addEventListener("click", function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
});
searchButton.addEventListener("click", displaySearch);

searchWrapper.addEventListener("click", function(event) {
    hideSearch();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
});
hideButton.addEventListener("click", hideSearch);

function displaySearch() {
    if (!indexed) {
        buildIndex();
    }
    if (!searchVisible) {
        document.body.style.overflow = "hidden";
        searchWrapper.style.visibility = "visible";
        input.focus();
        searchVisible = true;
    }
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

function hideSearch() {
    if (searchVisible) {
        document.body.style.overflow = "visible";
        searchWrapper.style.visibility = "hidden";
        input.value = "";
        output.innerHTML = "";
        document.activeElement.blur();
        searchVisible = false;
    }
}