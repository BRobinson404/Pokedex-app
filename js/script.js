let pokemonRepository = (function () {
//the following declares the pokemonList variable with an object array including name, type, and height.
    let pokemonList=[];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151"

//the getAll function returns the pokemonList from pokemonRepository

    function getAll () {
        return pokemonList
    };

//The add function pushes new pokemon to the pokemon to the pokemonList added "object" qualifier to prevent
//incorrect data from being added. if data is not a correctly formatted object the console will log "pokemon is not correct"

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        }else{
            console.log("pokemon is not correct")
        }
    };

//the showDetails function is used to log the input pokemon chosen from the addListItem button below vv

    function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon)
        });
    };

//The addListItem function creates 3 variables:the <ul> pokemon-list, listItem, and button the latter two are 
//created in the DOM. The inner text for the button is then set to pokemon.name and given the class "button-class"
//and appended to listItem and then listItem is appended to pokemonList. Lastly an event listener was added to 
//display the pokemons name in the console with a click using the showDetails functions

    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
          });
    };
//return block for the functions listed above in the IIFE
    return {
        getAll: getAll,
        add: add,
        showDetails : showDetails,
        addListItem : addListItem
        
    };
    
})();

// uncomment the code below to add object to pokemonRepository

pokemonRepository.add(
    {
        name: 'Charizard',
        type: ['fire','flying'],
        height: 5
    });
    
// // uncomment to log wrapped pokemonList
// console.log(pokemonRepository.getAll())

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
});

