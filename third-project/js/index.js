const setData = (data) => console.log(data)

const peticionGet = async (url) => {
    const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const datos = await respuesta.json()
    setData(datos.results)
}

peticionGet('https://pokeapi.co/api/v2/pokemon/')
