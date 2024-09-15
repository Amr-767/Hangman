let letters = "abcdefghijklmnopqrstuvwxyz";
let numberOfMistakes = 0;
let numberOfCorrects = 0;
// make the hangman arr draws

let hangmanDraws = [];
hangmanDraws.push(
  document.querySelector(".stand"),
  document.querySelector(".robe"),
  document.querySelector(".head"),
  document.querySelector(".body"),
  document.querySelector(".hands"),
  document.querySelector(".legs")
);

// generate the keys

let arrLetters = Array.from(letters);
arrLetters.forEach((letter) => {
  document.querySelector(
    ".keys"
  ).innerHTML += `<span class = "letter">${letter}<span>`;
  Array.from(document.getElementsByClassName("letter")).forEach((letter) => {
    letter.addEventListener("click", letterClicked);
  });
});

// words Object

let words = {
  programming: ["Python", "HTML", "JAVA", "JavaScript", "CSS", "PHP"],
  countries: [
    "Egypt",
    "America",
    "England",
    "France",
    "Germany",
    "Brazil",
    "china",
  ],
  animals: ["cat", "dog", "elephant", "lion", "ant"],
};

// choose a word

let allKeys = Object.keys(words);
let randomIndexProp = Math.floor(Math.random() * allKeys.length);
let randomProp = Object.keys(words)[randomIndexProp];
let Arrwords = words[randomProp];
let word = Arrwords[Math.floor(Math.random() * Arrwords.length)].toLowerCase();
document.querySelector("#category").innerHTML = randomProp;

// generate the guess spans
let guessDiv = document.querySelector(".guess");
let wordArr = Array.from(word);
wordArr.forEach(() => {
  guessDiv.innerHTML += `<span class ="guess-letter"></span> `;
});

// add letter clicked function

function letterClicked() {
  document.querySelector("#wrong").pause();
  document.querySelector("#correct").pause();
  this.classList.add("clicked");
  if (wordArr.includes(this.textContent.trim())) {
    this.classList.add("true");
    document.querySelector("#correct").play();
    wordArr.forEach((e, i) => {
      if (this.textContent.trim() === e) {
        Array.from(document.querySelectorAll(".guess .guess-letter"))[
          i
        ].innerHTML = e.toUpperCase();
        numberOfCorrects++;
        Array.from(document.querySelectorAll(".guess .guess-letter"))[
          i
        ].classList.add("correct");
      }
    });
    if (numberOfCorrects === wordArr.length) {
      document.getElementById("win").play();
      document.querySelector(".message").style.display = "flex";
      document.querySelector(
        ".message-content h1"
      ).innerHTML = `You Won with ${numberOfMistakes} mistakes ${
        numberOfMistakes < 2 ? "😎" : ""
      }`;
      document.querySelector(".keys").style.pointerEvents = "none";
    }
  } else {
    this.classList.add("false");
    document.querySelector("#wrong").play();
    hangmanDraws[numberOfMistakes].style.display = "block";
    if (numberOfMistakes === 5) {
      document.querySelector(
        ".message-content h1"
      ).innerHTML = `You Lost! 😢 (the word was "${
        word[0].toUpperCase() + word.slice(1)
      }")`;
      document.querySelector(".message").style.display = "flex";
      document.querySelector(".keys").style.pointerEvents = "none";
      document.getElementById("lost").play();
    }
    numberOfMistakes++;
    document.getElementById("number-of-mistakes").innerHTML = numberOfMistakes;
  }
}

// close the context menu
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// handle the message

document.querySelector(".message").addEventListener("click", () => {
  document.querySelector(".message").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(".message").remove();
  }, 300);
});

document.getElementById("reload").addEventListener("click", () => {
  window.location.reload();
});

document.getElementById("Pmusic").addEventListener("click", () => {
  document.getElementById("loop").play();
  document.getElementById("Pmusic").style.display = "none";
  document.getElementById("Smusic").style.display = "block";
});
document.getElementById("Smusic").addEventListener("click", () => {
  document.getElementById("loop").pause();
  document.getElementById("Pmusic").style.display = "block";
  document.getElementById("Smusic").style.display = "none";
});
