const cat = new URLSearchParams(window.location.search).get("cat");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;

const produktliste = document.querySelector(".produktliste");

document.querySelectorAll("#filtre button").forEach((knap) => knap.addEventListener("click", filtrer));
const visantal = document.querySelector("#filtre span");
function filtrer(e) {
  console.log(e.target.textContent);
  const valgt = e.target.textContent;
  if (valgt == "Alle") {
    udsnit = alleData;
  } else {
    udsnit = alleData.filter((produkt) => produkt.gender == valgt);
  }
  console.log(alleData, udsnit);
  visData(udsnit);
}
const h1 = document.querySelector("h1");
h1.textContent = cat;
let alleData, udsnit;
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    visData(data);
    alleData = udsnit = data;
  });
function visData(json) {
  visantal.textContent = json.length;
  // console.log(json);
  produktliste.innerHTML = "";
  json.forEach((produkt) => {
    const tilbudspris = Math.round(produkt.price - (produkt.price * produkt.discount) / 100);
    produktliste.innerHTML += `
    <a href=productdetails.html?id=${produkt.id} class=${produkt.soldout ? "udsolgt" : ""}>
            <article class="card">
              <img src=https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp alt="produktbillede" />
                <h2>${produkt.productdisplayname}</h2>
                <h3>${produkt.brandname}</h3>
                ${
                  produkt.discount
                    ? `<p class='tilbud'>-${produkt.discount}%</p>
                    <p>Før ${produkt.price},-<span class='nupris'> Nu ${tilbudspris}, -</span></p>`
                    : `<p>kr. ${produkt.price}, -</p>`
                }
                <p>${produkt.price}</p>
                <p>${produkt.gender}</p>
                <p>${produkt.subcategory}</p>
        </article>
  </a>`;
  });
}
document.querySelectorAll("#sortering button").forEach((button) => button.addEventListener("click", sorter));
function sorter(e) {
  const valgt = e.target.textContent;
  if (valgt === "Pris lav-høj") {
    udsnit.sort((a, b) => a.price - b.price);
  } else if (valgt === "Pris høj-lav") {
    udsnit.sort((a, b) => b.price - a.price);
  } else if (valgt === "A-Z") {
    udsnit.sort((a, b) => a.productdisplayname.localeCompare(b.productdisplayname));
  } else if (valgt === "Z-A") {
    udsnit.sort((a, b) => b.productdisplayname.localeCompare(a.productdisplayname));
  }
  visData(udsnit);
}
