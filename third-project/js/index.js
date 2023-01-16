let selectedPokemons = []
let dataPokemons = []
let myChartWeight
let myChartHeight

import { loadTable, loadButtons } from './elements.js'

window.addEventListener('DOMContentLoaded', (event) => {
    retrievePokemons('https://pokeapi.co/api/v2/pokemon/')
    let persistedSelectedPokemons = localStorage.getItem('selectedPokemons')
    if(!persistedSelectedPokemons) {
        localStorage.setItem('selectedPokemons', JSON.stringify([]))
        persistedSelectedPokemons = '[]'
    }
    selectedPokemons = JSON.parse(persistedSelectedPokemons)

    let persistedDataPokemons = localStorage.getItem('dataPokemons')
    if(!persistedDataPokemons) {
        localStorage.setItem('dataPokemons', JSON.stringify([]))
        persistedDataPokemons = '[]'
    }
    dataPokemons = JSON.parse(persistedDataPokemons)

    updateChartWeight(document, dataPokemons)
    updateChartHeight(document, dataPokemons)
})

const retrievePokemons = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    loadTable(data.results, selectedPokemons, document)
    loadButtons(data, document)
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

    updateDataInLocalStorage(selectedPokemons, dataPokemons)
    updateChartWeight(document, dataPokemons)
    updateChartHeight(document, dataPokemons)
}

const removeDataOfAPokemon = (pokemonName) => {
    dataPokemons.filter((value, index, array) => {
        if(value.name == pokemonName) {
            array.splice(index, 1)
            return true
        }
        return false
    })

    updateDataInLocalStorage(selectedPokemons, dataPokemons)
    updateChartWeight(document, dataPokemons)
    updateChartHeight(document, dataPokemons)
}

const updateDataInLocalStorage = (selectedPokemons, dataPokemons) => {
    localStorage.setItem('selectedPokemons', JSON.stringify(selectedPokemons))
    localStorage.setItem('dataPokemons', JSON.stringify(dataPokemons))
}

const updateChartWeight = (document, dataPokemons) => {
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

const updateChartHeight = (document, dataPokemons) => {
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

export { retrievePokemons, editList }