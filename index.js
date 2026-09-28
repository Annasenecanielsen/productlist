const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const produktliste = document.querySelector("#catlistecontainer");

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  json.forEach((element) => {
    console.log(element);
    catlistecontainer.innerHTML += `<a href="productlist.html?cat=${encodeURI(element.category)}">${element.category}</a>`;
  });
}
