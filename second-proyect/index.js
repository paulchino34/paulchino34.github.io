let users = []

window.addEventListener('DOMContentLoaded', (event) => {
    loadAllUsers()
})

function removeUser(userId) {
    users = users.filter(user => user.id != userId)
    localStorage.setItem('persistedUsers', JSON.stringify(users))
    window.location.reload()
}

function saveOrUpdateUsers() {
    let id = document.getElementById('inputHiddenId').value
    if(id) {
        users = users.filter(user => user.id != id)
    } else{{
        const date = new Date();
        id = date.getTime();
    }}
    let firstname = document.getElementById('firstname').value
    let lastname = document.getElementById('lastname').value
    let email = document.getElementById('email').value
    let country = document.getElementById('country').value
    let accountType = document.getElementById('accountType').value
    if(!validateAllData()) {
        return
    }
    let user = new User(id, firstname, lastname, email, country, accountType)
    users.push(user)
    localStorage.setItem('persistedUsers', JSON.stringify(users))
    window.location.reload()
}

function validateAllData() {
    let valid = true
    if(!validateElementById('firstname')) valid = false
    if(!validateElementById('lastname')) valid = false
    if(!validateElementById('email')) valid = false
    if(!validateElementById('country')) valid = false
    if(document.getElementById('accountType').value.trim().length == 0) {
        document.getElementById('selectAccountType').classList.add("errorAttibute");
        valid = false
    }
    return valid
}

function validateElementById(elementId) {
    let element = document.getElementById(elementId)
    if(element.value.length == 0) {
        element.classList.add("errorAttibute");
        return false
    }
    element.classList.remove("errorAttibute");
    return true
}

function selectValue() {
    document.getElementById('accountType').value = document.getElementById('selectAccountType').value
    if(document.getElementById('accountType').value.trim().length == 0) {
        document.getElementById('selectAccountType').classList.add("errorAttibute");
    } else {
        document.getElementById('selectAccountType').classList.remove("errorAttibute");
    }
}

function editUser(userId) {
    let user = users.filter(user => user.id == userId)[0]
    document.getElementById('inputHiddenId').value = user.id
    document.getElementById('firstname').value = user.firstname
    document.getElementById('lastname').value = user.lastname
    document.getElementById('email').value = user.email
    document.getElementById('country').value = user.country
    document.getElementById('accountType').value = user.accountType
    document.getElementById('selectAccountType').value = user.accountType

    document.getElementById('btnSaveOrUpdate').innerHTML = 'Actualizar'
}

function loadAllUsers() {
    let persistedUsers = localStorage.getItem('persistedUsers')
    if(!persistedUsers) {
        localStorage.setItem('persistedUsers', JSON.stringify([]))
    }
    users = JSON.parse(persistedUsers)
    users = users.map(user => new User(user.id, user.firstname, user.lastname, user.email, user.country, user.accountType))
    let table = document.getElementById('tblUsers')
    if(users.length > 0) {
        users.forEach(user => {
            let rowCount = table.rows.length
            let row = table.insertRow(rowCount)
            row.insertCell(0).innerHTML = user.fullname()
            row.insertCell(1).innerHTML = user.email
            row.insertCell(2).innerHTML = user.country
            row.insertCell(3).innerHTML = user.accountType
            row.insertCell(4).innerHTML  = '<button onclick="removeUser(' + user.id + ')">Eliminar</button>' + 
                        '<button onclick="editUser(' + user.id + ')">Editar</button>'
        });
    } else {
        document.getElementById('tblUsers').hidden = true
        document.getElementById('pInfoTable').hidden = false
    }
}

class User {
    constructor(id, firstname, lastname, email, country, accountType) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.country = country
        this.accountType = accountType
    }
}

User.prototype.fullname = function() {
    return this.firstname + ' ' + this.lastname
};