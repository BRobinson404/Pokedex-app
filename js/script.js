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

//following code is a for() loop function that cycles through the
// pokemmonList array and displays the name and the height in feet.
let text='';
for (let i=0; i< pokemonList.length; i++){
    text = ' ' + pokemonList[i].name + ' (height:' + pokemonList[i].height + 'ft)';
// adds a conditional to the loop if size greater than 5ft display special message
