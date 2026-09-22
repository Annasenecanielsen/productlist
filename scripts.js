const endpoint = "https://kea-alt-del.dk/t7/api/products?start=43888&limit=30";

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
  json.forEach((element) => {
    produktliste.innerHTML += `<article class="card">
    <img src=https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp alt="produktbillede">
     <h3>${element.gender}</h3>
      <p>${element.subcategory}</p>
       <p>${element.brandname}</p>
        <p>${element.price}kr,-</p>

    </article>`;
  });
}

const produktliste = document.querySelector(".produktliste");
