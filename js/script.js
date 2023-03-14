let pokemonRepository = (function () {
//the following declares the pokemonList variable with an object array including name, type, and height.
    let pokemonList=[
        {
            name: 'Bulbasaur',
            type: ['grass', 'poison'],
            height: 2
        },
        {
            name: 'Ivysaur',
            type: ['grass', 'poison'],
            height: 3
        },
        {
            name: 'Venusaur',
            type: ['grass', 'poison'],
            height: 6
        }
    ]
    function getPokemonList(pokemon) {
        document.write(pokemon.name + ' (' + pokemon.type + ') ' + pokemon.height + 'ft ');
     }
    pokemonList.forEach(getPokemonList);
    
    function getAll () {
        return pokemonList
    }
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
    }
    
})()
// uncomment to add object to pokemonRepository

// pokemonRepository.add(
// {
//     name: 'Charizard',
//     type: ['fire','flying'],
//     height: 5
// })

// uncomment to log the wrapped variable
// console.log(pokemonRepository.getAll())