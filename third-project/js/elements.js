import { retrievePokemons, editList } from './index.js'

let previousPageUrl = null
let nextPageUrl = null

const deleteRows = (table) => {
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

const loadTable = (pokemons, selectedPokemons, document) => {
    let table = document.getElementById('tblAllPokemons')
    deleteRows(table)
    if(pokemons.length >= 0) {
        pokemons.forEach(pokemon => {
            let rowCount = table.rows.length
            let row = table.insertRow(rowCount)
            let checked = selectedPokemons.indexOf(pokemon.url) >= 0 ? 'checked' : ''
            row.insertCell(0).innerHTML = `<input type="checkbox" class="input-checkbox" value="${pokemon.url}" ${checked}/>`
            row.insertCell(1).innerHTML = pokemon.name
        })
    }  
    
    let inputs = document.querySelectorAll('.input-checkbox')
    inputs.forEach(input => input.addEventListener('click', event => editList(event.srcElement, event.srcElement.value)))
}

const loadButtons = (allDataPokemon, document) => {
    let btnPrevious = document.getElementById('btnPrevious')
    let btnNext = document.getElementById('btnNext')
    btnPrevious.hidden = allDataPokemon.previous ? false : true
    btnNext.hidden = allDataPokemon.next ? false : true

    previousPageUrl = allDataPokemon.previous
    nextPageUrl = allDataPokemon.next
    
    btnPrevious.addEventListener('click', event => previousPage())
    btnNext.addEventListener('click', event => nextPage())
}

const previousPage = () => {
    retrievePokemons(previousPageUrl)
}

const nextPage = () => {
    retrievePokemons(nextPageUrl)
}

export { loadTable, loadButtons}