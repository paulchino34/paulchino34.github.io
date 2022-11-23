let families = []

window.addEventListener('DOMContentLoaded', (event) => {
    loadAllFamilies()
})

function removeFamily(familyId) {
    families = families.filter(family => family.id != familyId)
    localStorage.setItem('persistedFamilies', JSON.stringify(families))
    window.location.reload()
}

function saveOrUpdateFamiliy() {
    let id = document.getElementById('inputHiddenId').value
    if(id) {
        families = families.filter(family => family.id != id)
    } else{{
        const date = new Date();
        id = date.getTime();
    }}
    let lastname = document.getElementById('lastname').value
    let accountNumbers = document.getElementById('accountNumbers').value
    let email = document.getElementById('email').value
    let country = document.getElementById('country').value
    let accountType = document.getElementById('accountType').value
    let family = new Family(id, lastname, accountNumbers, email, country, accountType)
    families.push(family)
    localStorage.setItem('persistedFamilies', JSON.stringify(families))
    window.location.reload()
}

function editFamily(familyId) {
    let family = families.filter(family => family.id == familyId)[0]
    document.getElementById('inputHiddenId').value = family.id
    document.getElementById('lastname').value = family.lastname
    document.getElementById('accountNumbers').value = family.accountNumbers
    document.getElementById('email').value = family.email
    document.getElementById('country').value = family.country
    document.getElementById('accountType').value = family.accountType
}

function loadAllFamilies() {
    let persistedFamilies = localStorage.getItem('persistedFamilies')
    if(!persistedFamilies) {
        localStorage.setItem('persistedFamilies', JSON.stringify([]))
    }
    families = JSON.parse(persistedFamilies)
    let table = document.getElementById('tblFamilies')
    if(families.length > 0) {
        families.forEach(family => {
            let rowCount = table.rows.length
            let row = table.insertRow(rowCount)
            row.insertCell(0).innerHTML = family.lastname
            row.insertCell(1).innerHTML = family.accountNumbers
            row.insertCell(2).innerHTML = family.email
            row.insertCell(3).innerHTML = family.country
            row.insertCell(4).innerHTML = family.accountType
            row.insertCell(5).innerHTML  = '<button onclick="removeFamily(' + family.id + ')">Eliminar</button>' + 
                        '<button onclick="editFamily(' + family.id + ')">Editar</button>'
        });
    }
}


class Family {
    constructor(id, lastname, accountNumbers, email, country, accountType) {
        this.id = id
        this.lastname = lastname
        this.accountNumbers = accountNumbers
        this.email = email
        this.country = country
        this.accountType = accountType
    }
}