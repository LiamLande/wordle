
const hentData = async ()=>{
    const data = await fetch('https://ithns.github.io/ordlisteFull.json')
    const json = await data.json()
    newWord(json.ordliste)
}
//Henter data og velger ord
var finalWord = "";
function newWord(list) {
    finalWord = list[Math.floor(Math.random()*list.length)].ord.toUpperCase()
    console.log(finalWord);
}
//Henter nytt tilfeldig ord
hentData();
const validKeys = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
    "p","q","r","s","t","u","v","w","x","y","z","æ","ø","å"
]
//alle bokstaver som funker


var enteredWord = "";

var boxes = document.querySelectorAll(".box");
//Alle boksene som man kan skrive i

var allDivs = document.querySelectorAll(".content div")
var rows = [allDivs[0],allDivs[6],allDivs[12],allDivs[18],allDivs[24],allDivs[30]]
//Radene, også kjent som anntall liv
//Burde ha gitt dem egen class men orket ikke.
console.log(rows);
console.log(boxes);

var locationX = 0;
var locationY = 0;

function write(letter) {
    if(enteredWord.length < 5){
        locationX++
        rows[locationY].childNodes[locationX].innerHTML = letter;
        enteredWord += letter
        locationX++
    }
    console.log(enteredWord);
}
function deleteLetter() {
    locationX--
    rows[locationY].childNodes[locationX].innerHTML = ""
    enteredWord = enteredWord.substring(0,enteredWord.length-1)
    locationX--
}
function checkWord(w) {
    if(w.length == 5){
        if (w == finalWord) {
            console.log("DU VANT WÆÆÆÆÆW");
        }
        let farger = guessColors(finalWord, w);
        let x = 0;
        for (let i = 0; i < rows[locationY].childNodes.length; i++) {
            var farge = farger[x];
            if (i%2) {
                console.log(i)

                console.log(rows[locationY].childNodes[i])
                rows[locationY].childNodes[i].style = `background-color:${farge};`
                console.log(farge)
                x++
            }
        }

        
        locationY += 1
        console.log(rows[locationY]);
        locationX=0
        enteredWord = ""
    }
}
//fikk denne fra https://codereview.stackexchange.com/questions/274301/wordle-color-algorithm-in-javascript
// letter background colors
const COLOR_NOT_ENTERED   = "White";
const COLOR_CORRECT_SPOT  = "Green";
const COLOR_WRONG_SPOT    = "Yellow";
const COLOR_NOT_ANY_SPOT  = "Gray";

// guessColors returns an array of guess letter background colors.
function guessColors(word, guess) { 
    let colors = new Array(guess.length);
    if (word.length !== guess.length) {
        return colors.fill(COLOR_NOT_ENTERED);
    }

    // color matched guess letters as correct-spot, 
    // and count unmatched word letters
    let unmatched = {}; // unmatched word letters
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];
        if (letter === guess[i]) {
            colors[i] = COLOR_CORRECT_SPOT;
        } else {
            unmatched[letter] = (unmatched[letter] || 0) + 1;
        }
    }

    // color unmatched guess letters right-to-left, 
    // allocating remaining word letters as wrong-spot,
    // otherwise, as not-any-spot
    for (let i = 0; i < guess.length; i++) {
        let letter = guess[i];
        if (letter !== word[i]) {
            if (unmatched[letter]) {
                colors[i] = COLOR_WRONG_SPOT;
                unmatched[letter]--;
            } else {
                colors[i] = COLOR_NOT_ANY_SPOT;
            }
        }
    }

    return colors;
}




document.addEventListener("keydown",(event)=>{
    var name = event.key
    console.log(event)
    if(validKeys.includes(name)){
        console.log("True", name)
        
        write(name.toUpperCase());
    }
    if (name == "Backspace") {
        deleteLetter();
    }
    if(name == "Enter"){
        checkWord(enteredWord);
    }
})
//lager en eventlistener for alle tastetrykk som gjelder