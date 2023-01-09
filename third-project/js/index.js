let previousPageUrl = null
let nextPageUrl = null
let selectedPokemons = []
let dataPokemons = []
let myChartWeight
let myChartHeight

window.addEventListener('DOMContentLoaded', (event) => {
    retrievePokemons('https://pokeapi.co/api/v2/pokemon/')
    persistedSelectedPokemons = localStorage.getItem('selectedPokemons')
    if(!persistedSelectedPokemons) {
        localStorage.setItem('selectedPokemons', JSON.stringify([]))
        persistedSelectedPokemons = '[]'
    }
    selectedPokemons = JSON.parse(persistedSelectedPokemons)

    persistedDataPokemons = localStorage.getItem('dataPokemons')
    if(!persistedDataPokemons) {
        localStorage.setItem('dataPokemons', JSON.stringify([]))
        persistedDataPokemons = '[]'
    }
    dataPokemons = JSON.parse(persistedDataPokemons)

    updateChartWeight()
    updateChartHeight()
})

const retrievePokemons = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    loadTable(data.results)
    loadButtons(data)
}

const loadTable = (pokemons) => {
    let table = document.getElementById('tblAllPokemons')
    deleteRows(table)
    if(pokemons.length >= 0) {
        pokemons.forEach(pokemon => {
            let rowCount = table.rows.length
            let row = table.insertRow(rowCount)
            let checked = selectedPokemons.indexOf(pokemon.url) >= 0 ? 'checked' : ''
            row.insertCell(0).innerHTML = `<input type="checkbox" value="${pokemon.name}" onclick="editList(this, '${pokemon.url}')" ${checked}/>`
            row.insertCell(1).innerHTML = pokemon.name
        })
    }    
}

const deleteRows = (table) => {
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

const loadButtons = (allDataPokemon) => {
    let btnPrevious = document.getElementById('btnPrevious')
    let btnNext = document.getElementById('btnNext')
    btnPrevious.hidden = allDataPokemon.previous ? false : true
    btnNext.hidden = allDataPokemon.next ? false : true

    previousPageUrl = allDataPokemon.previous
    nextPageUrl = allDataPokemon.next
}

const previousPage = () => {
    retrievePokemons(previousPageUrl)
}

const nextPage = () => {
    retrievePokemons(nextPageUrl)
}

const editList = (element, pokemon) => {
    if(element.checked) {
        selectedPokemons.push(pokemon)
        retrieveDataOfPokemon(pokemon)
    } else {
        let index = selectedPokemons.indexOf(pokemon)
        selectedPokemons.splice(index, 1)
        removeDataOfAPokemon(element.value)
    }
    console.log(selectedPokemons)
}

const retrieveDataOfPokemon = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    let element = {
        "name" : data.name, 
        "height" : data.height,
        "weight" : data.weight
    }

    dataPokemons.push(element)

    updateDataInLocalStorage()
    updateChartWeight()
    updateChartHeight()
}

const removeDataOfAPokemon = (pokemonName) => {
    dataPokemons.filter((value, index, array) => {
        if(value.name == pokemonName) {
            array.splice(index, 1)
            return true
        }
        return false
    })

    updateDataInLocalStorage()
    updateChartWeight()
    updateChartHeight()
}

const updateDataInLocalStorage = () => {
    localStorage.setItem('selectedPokemons', JSON.stringify(selectedPokemons))
    localStorage.setItem('dataPokemons', JSON.stringify(dataPokemons))
}

const updateChartWeight = () => {
    let ctx = document.getElementById('myChartWeight')

    let names = dataPokemons.map(pokemon => pokemon.name)
    let weights = dataPokemons.map(pokemon => pokemon.weight)

    let cfg = {
        type: 'bar',
        data: {
            labels: names,
            datasets: [
                {
                    label: 'Peso de los pokemon',
                    data: weights
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    }
    if(myChartWeight) {
        myChartWeight.destroy()
    }
    myChartWeight = new Chart(ctx, cfg)
}

const updateChartHeight = () => {
    let ctx = document.getElementById('myChartHeight')

    let names = dataPokemons.map(pokemon => pokemon.name)
    let heights = dataPokemons.map(pokemon => pokemon.height)

    let cfg = {
        type: 'bar',
        data: {
            labels: names,
            datasets: [
                {
                    label: 'Altura de los pokemon',
                    data: heights
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    }
    if(myChartHeight) {
        myChartHeight.destroy()
    }
    myChartHeight = new Chart(ctx, cfg)
}