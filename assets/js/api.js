const api = {}
    
// api.getPokemons = (offset = 0, limit = 12) => {

//     return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
//         .then((response) => response.json())
//         .then((jsonBody) => jsonBody.results)
// }

function apiDetailToPokemon(pokedetail) {
    const pokemon = new Pokemon();

    pokemon.order = pokedetail.id
    pokemon.name = pokedetail.name

    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name);
    const [type1] = types

    pokemon.types = types
    pokemon.type = type1
    pokemon.photo = pokedetail.sprites.other['official-artwork'].front_default

    return pokemon;
}


api.getPokemonInfo = (pokemon) => {    
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(apiDetailToPokemon)
}

api.getPokemons = (offset = 0, limit = 36) => {

    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(api.getPokemonInfo))
        .then((listRequest) => Promise.all(listRequest))
        .then((pokemonDetails) => pokemonDetails)
}
