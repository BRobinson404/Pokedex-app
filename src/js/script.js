let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=905';
  let currentPage = 1;
  let itemsPerPage = 150; // Number of items to display per page

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
      let pokemonAbilities = getAbilities(pokemon.abilities); // New code to get abilities
      
      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonTypes);
      modalBody.append(pokemonAbilities); // New code to append abilities
    }
    
    function getAbilities(abilities) {
      let abilitiesElement = document.createElement('p');
      let finalString = 'Abilities: ';
      abilities.forEach( ability => {
        finalString += ability.ability.name + ' ';
      });
      abilitiesElement.innerText = finalString;
      return abilitiesElement;
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
      item.abilities = details.abilities; // New code to add abilities
    }).catch(function (e) {
      console.error(e);
    });
  }

  function searchPokemon() {
    let searchInput = document.getElementById('search-input');
    let searchText = searchInput.value.toLowerCase();
    let allPokemon = document.querySelectorAll('.list-group-item');

    allPokemon.forEach(function(pokemon) {
      let pokemonText = pokemon.querySelector('.pokemon-button').innerText.toLowerCase();
      let searchList = document.querySelector('.pokemon-list');

      if (pokemonText.includes(searchText)) {
        searchList.classList.add('search-list');
        pokemon.style.display = 'inline-block';
      } else {
        pokemon.style.display = 'none';
      }

      if (!searchInput.value) {
        searchList.classList.remove('search-list');
      }

    });
  }  

  //Triggers search function as input is typed
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function () {
    searchPokemon();
  });

  
  function showPage(page) {
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = page * itemsPerPage;
    let pokemonListItems = document.querySelectorAll('.list-group-item');
  
    // Hide all Pokemon list items
    pokemonListItems.forEach(function(pokemon, index) {
      // Display only the first 150 Pokemon, hide the rest
      if (index < endIndex && index >= startIndex) {
        pokemon.style.display = 'inline-block';
      } else {
        pokemon.style.display = 'none';
      }
    });
  
    // Show only the items for the current page
    // for (let i = startIndex; i < endIndex && i < pokemonListItems.length; i++) {
    //   pokemonListItems[i].style.display = 'inline-block';
    // }
  }

  // Function to display previous page
  function showPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  }

  // Function to display next page
  function showNextPage() {
    if (currentPage < Math.ceil(pokemonList.length / itemsPerPage)) {
      currentPage++;
      showPage(currentPage);
    }
  }

  // Function to initialize pagination buttons
  function initializePaginationButtons() {
    let previousButton = document.getElementById('previous-button');
    let nextButton = document.getElementById('next-button');

    previousButton.addEventListener('click', showPreviousPage);
    nextButton.addEventListener('click', showNextPage);
  }

  // Call the function to initialize pagination buttons
  initializePaginationButtons();
  
  function makeHeaderFixed() {
    let header = document.querySelector('header');
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 0) {
        header.classList.add('fixed-header');
      } else {
        header.classList.remove('fixed-header');
      }
    });
  }
  
  makeHeaderFixed();

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    searchPokemon: searchPokemon
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});