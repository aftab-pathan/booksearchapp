let searchInput = document.getElementById("searchInput");
let selectDisplayCount = document.getElementById("selectDisplayCount");
let selectDisplayCountValue = "10";
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendResult(result) {
    let {
        title,
        imageLink,
        author
    } = result;

    let resultcontainer = document.createElement("div");
    resultcontainer.classList.add("col-6", "mb-3");
    searchResults.appendChild(resultcontainer);

    let resultImage = document.createElement("img");
    resultImage.src = imageLink;
    resultImage.classList.add("w-100");
    resultcontainer.appendChild(resultImage);

    let breakeEl = document.createElement("br");
    resultcontainer.appendChild(breakeEl);

    let authorName = document.createElement("P");
    authorName.classList.add("author-name", "mt-2");
    authorName.textContent = author;
    resultcontainer.appendChild(authorName);

}

function getSearchresult() {
    let searchInputValue = searchInput.value;
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue + "&maxResults=" + selectDisplayCountValue;

    spinner.classList.remove("d-none");
    searchResults.classList.add("d-none");

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData)
            spinner.classList.add("d-none");
            searchResults.classList.remove("d-none");

            if (jsonData.search_results.length === 0) {
                let noResult = document.createElement("h1");
                noResult.classList.add("text-center", "noresult-text", "p-4");
                searchResults.appendChild(noResult);
                noResult.textContent = "No results found";
            } else {
                let heading = document.createElement("h1");
                heading.classList.add("result-heading", "p-3", "col-12");
                heading.textContent = "Popular Books";
                searchResults.appendChild(heading);
                for (let result of jsonData.search_results) {
                    createAndAppendResult(result);
                }
            }
        });
}

selectDisplayCount.addEventListener("change", function(event) {
    selectDisplayCountValue = event.target.value;
    searchResults.textContent = "";
    getSearchresult();
});

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        getSearchresult();
    }
});