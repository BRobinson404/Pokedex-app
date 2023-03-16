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
    ];

//the getAll function returns the pokemonList from pokemonRepository

    function getAll () {
        return pokemonList
    };

//The add function pushes new pokemon to the pokemon to the pokemonList added "object" qualifier to prevent
//incorrect data from being added. if data is not a correctly formatted object the console will log "pokemon is not correct"

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

//the showDetails function is used to log the input pokemon chosen from the addListItem button below vv


//The addListItem function creates 3 variables:the <ul> pokemon-list, listItem, and button the latter two are 
//created in the DOM. The inner text for the button is then set to pokemon.name and given the class "button-class"
//and appended to listItem and then listItem is appended to pokemonList. Lastly an event listener was added to 
//display the pokemons name in the console with a click using the showDetails functions

//return block for the functions listed above in the IIFE
    return {
        getAll: getAll,
        add: add,
    }
    
})()

pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + ' (' + pokemon.type + ') ' + pokemon.height + 'ft ');
})
// uncomment to add object to pokemonRepository
// uncomment the code below to add object to pokemonRepository

// pokemonRepository.add(
// {
//     name: 'Charizard',
//     type: ['fire','flying'],
//     height: 5
// })

// // uncomment to log the wrapped variable
// console.log(pokemonRepository.getAll())//     {
