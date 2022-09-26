// stat variables
let cardsUncovers = 0;
let card01 = null;
let card02 = null;
let firstResult = null;
let secondResult = null;



// numbers
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort( () => {return Math.random() - 0.5});
console.log(numbers);

// principal function
function uncover(id){
    cardsUncovers++;
    console.log(cardsUncovers);

    if(cardsUncovers == 1){
        // show first number
        card01 = document.getElementById(id);
        firstResult = numbers[id];
        card01.innerHTML = numbers[id];

        // disable first button
        card01.disabled = true;
    };
}