window.addEventListener('DOMContentLoaded', (event) => {
    retrievePokemons('https://pokeapi.co/api/v2/pokemon/')
})

let previousPageUrl = null
let nextPageUrl = null
let selectedPokemons = []
let dataPokemons = []

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

const retrieveDataOfPokemon = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    let element = new Object()
    element.name = data.name
    element.height = data.height
    element.weight = data.weight

    dataPokemons.push(element)
}

const loadTable = (pokemons) => {
    let table = document.getElementById('tblAllPokemons')
    deleteRows(table)
    if(pokemons.length >= 0) {
        pokemons.forEach(pokemon => {
            let rowCount = table.rows.length
            let row = table.insertRow(rowCount)
            let checked = selectedPokemons.indexOf(pokemon.url) > 0 ? 'checked' : ''
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
        removePokemonData(element.value)
    }
}

const removePokemonData = (pokemonName) => {
    dataPokemons.filter((value, index, array) => {
        if(value.name == pokemonName) {
            array.splice(index, 1)
            return true
        }
        return false
    })
} 
