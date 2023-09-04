let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl);
    }   catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }
      
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')
    
    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};  
        
       
async function loadPlanets(url) {
        const mainContent = document.getElementById('main-content')
        mainContent.innerHTML = ''; 

        try {

            const response = await fetch(url);
            const responseJson = await response.json();

            responseJson.results.forEach((planets) => {
                console.log("Creating card for planet:", planets.name);
                const card = document.createElement("div")
                card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
                card.className = "cards"

                const planetsNameBG = document.createElement("div")
                planetsNameBG.className = "planets-name-bg"

                const planetsName = document.createElement("span")
                planetsName.className = "planets-name"
                planetsName.innerText = `${planets.name}`

                planetsNameBG.appendChild(planetsName)
                card.appendChild(planetsNameBG)

                card.addEventListener('click', () => {
                    console.log("Card clicked for planet:", planets.name);
                    const modal = document.getElementById("modal")
                    modal.style.visibility = "visible"

                    const modalContent = document.getElementById("modal-content")
                    modalContent.innerHTML = ''

                    const planetsImage = document.createElement("div")
                    planetsImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
                    planetsImage.className = "planets-image"

                    const name = document.createElement("span");
                    name.className = "planets-details";
                    name.innerText = `Nome: ${planets.name}`;

                    const planetsClimate = document.createElement("span");
                    planetsClimate.className = "planets-details";
                    planetsClimate.innerText = `Clima: ${convertPlanetsClimate(planets.climate)}`;

                    const terrain = document.createElement("span");
                    terrain.className = "planets-details";
                    terrain.innerText = `Terreno: ${convertTerrain(planets.terrain)}`;

                    const surfaceWater = document.createElement("span");
                    surfaceWater.className = "planets-details";
                    surfaceWater.innerText = `água na superfície: ${convertSurfaceWater(planets.surface_water)}`;

                    modalContent.appendChild(planetsImage);
                    modalContent.appendChild(name);
                    modalContent.appendChild(planetsClimate);
                    modalContent.appendChild(terrain);
                    modalContent.appendChild(surfaceWater);
                });
                mainContent.appendChild(card)
            });

            const nextButton = document.getElementById('next-button')
            const backButton = document.getElementById('back-button')

            nextButton.disabled = !responseJson.next
            backButton.disabled = !responseJson.previous

            backButton.style.visibility = responseJson.previous? "visible" : "hidden"

            currentPageUrl = url

        } catch (error) {
            alert('Erro ao carregar os planetas')
            console.log(error)
        }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

        try {
            const response = await fetch(currentPageUrl)
            const responseJson = await response.json()

            await loadPlanets(responseJson.next)
        } catch (error) {
            console.log(error)
            alert('Erro ao carregar a próxima página')
        }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

        try {
            const response = await fetch(currentPageUrl)
            const responseJson = await response.json()

            await loadPlanets(responseJson.previous)
        } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertPlanetsClimate(planetsClimate) {
    console.log("Converting climate:", planetsClimate);
    const Clima = {
        arid: "arido",
        grasslands: "pastagens",
        mountains: "montanhoso",
        temperate: "temperado",
        frozen: "congelado",
        murky: "obscuro"
    };
        return Clima[planetsClimate.toLowerCase()] || planetsClimate
}