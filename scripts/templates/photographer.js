function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;
    console.log(data)

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const link = document.createElement('a');
        const div = document.createElement("div");
        const divInfo = document.createElement("div");
        const pCity = document.createElement("p");
        const pTagLine = document.createElement("p");
        const pPrice = document.createElement("p");
        div.classList.add("portrait");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        divInfo.classList.add("info");
        pCity.classList.add("city");
        pTagLine.classList.add("tagline");
        pPrice.classList.add("price");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        pCity.textContent = city + ", " + country;
        pTagLine.textContent = tagline;
        pPrice.textContent = price + "€/jour";
        div.appendChild(img);
        link.appendChild(div);
        link.appendChild(h2);
        divInfo.appendChild(pCity);
        divInfo.appendChild(pTagLine);
        divInfo.appendChild(pPrice);
        article.appendChild(link);
        article.appendChild(divInfo)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}