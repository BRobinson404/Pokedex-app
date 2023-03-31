let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  
  function getTypes(types) {
    let typeElement = document.createElement('p');
     let finalString = 'Types: ';
      types.forEach( type => {
        finalString += type.type.name + ' ';
  });
  typeElement.innerText = finalString;
  return typeElement;
  }

  function addListItem(pokemon) {
    let pokemonListFolder = document.querySelector(".pokemon-list");
    let createlistItem = document.createElement("li");
    createlistItem.classList.add("list-group-item")
    let button = document.createElement("button");
    button.innerText= pokemon.name;
    button.classList.add("btn-block");
    button.classList.add("btn-primary");
    button.classList.add("pokemon-button");
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    createlistItem.classList.add('col-xl-3');
    createlistItem.classList.add('col-lg-4');
    createlistItem.classList.add('col-md-6');
    createlistItem.appendChild(button);
    pokemonListFolder.appendChild(createlistItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    };
    
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        showModal(item);
      });
    };

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $("<h1>" + pokemon.name + "</h1>")
    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    pokemonImage.attr("src", pokemon.imageUrl);
    let pokemonHeight = $("<p>" + "Height: " + pokemon.height/10 + "m" + "</p>");
    let pokemonTypes = getTypes(pokemon.types);
    
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);
  } 

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});