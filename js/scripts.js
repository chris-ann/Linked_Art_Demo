async function processGettyData() {
    // Getty Endpoint
    const gettyBase = "https://data.getty.edu/museum/collection/object/"
    const gettyObj = "fc692fde-9d21-4cee-820e-b11397003c55"
    const gettyUrl = gettyBase + gettyObj;

    // call fetch function with endpoint 
    const data = await getLinkedArt(gettyUrl);
    console.log("Getty data:", data);

    // get data from JSON object
    const imageUrl = data.representation[0].id;
    const title = data.identified_by[0].content
    const artist = data.produced_by.carried_out_by[0]._label;

    // create card with image, title, and artist
    makeImage(imageUrl, title, artist);
}
processGettyData();

async function processRijksData() {
    // Rijks Endpoint
    const rijksBase = "https://id.rijksmuseum.nl/"
    const rijksObj = "200108146?_profile=la-framed"
    const rijksUrl = rijksBase + rijksObj;

    // call fetch function with endpoint
    const data = await getLinkedArt(rijksUrl);
    console.log("Rijks data:", data);

    // get data from JSON object
    const imageUrl = data.subject_of[0].digitally_carried_by[0].access_point[0].id;
    const title = data.identified_by[1].content;
    const artist = data.produced_by.part[0].carried_out_by[0].notation[0]["@value"];

    // create card with image, title, and artist
    makeImage(imageUrl, title, artist);
}
processRijksData();

async function processLuxData() {
    // Lux Endpoint
    const luxBase = "https://lux.collections.yale.edu/data/object/"
    const luxObj = "938bcd48-51ec-41fb-8a7c-72fc2853672f"
    const luxUrl = luxBase + luxObj;

    // call fetch function with endpoint
    const data = await getLinkedArt(luxUrl);
    console.log("Lux data:", data);

    // get data from JSON object
    const imageUrl = data.representation[0].digitally_shown_by[0].access_point[0].id;
    const title = data.identified_by[0].content
    const artist = data.produced_by.part[0].carried_out_by[0]._label;

    // create card with image, title, and artist
    makeImage(imageUrl, title, artist);
}
processLuxData();


// FETCH DATA FROM LINKED ART API
async function getLinkedArt(url) {
    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
    return data;
}

// CREATE IMAGE AND TITLE ELEMENTS
function makeImage(imageUrl, title, artist) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const newImage = document.createElement("img");
    const newTitle = document.createElement("h2");
    const newArtist = document.createElement("p");

    newTitle.textContent = title;
    newArtist.textContent = artist;
    newImage.src = imageUrl;
    newImage.alt = title;

    document.getElementById("main").appendChild(newCard);
    newCard.appendChild(newImage);
    newCard.appendChild(newTitle);
    newCard.appendChild(newArtist);
}
