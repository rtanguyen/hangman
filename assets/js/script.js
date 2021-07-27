const wordsArr = [
    {
        category: 'animals',
        word: 'GIRAFFE'
    },
    {
        category: 'animals',
        word: 'ALPACA'
    },
    {
        category: 'animals',
        word: 'TURTLE'
    },
    {
        category: 'animals',
        word: 'FLAMINGO'
    },
    {
        category: 'countries',
        word: 'ICELAND'
    },
    {
        category: 'countries',
        word: 'SINGAPORE'
    },
    {
        category: 'countries',
        word: 'FINLAND'
    },
    {
        category: 'countries',
        word: 'CHILE'
    },
    {
        category: 'fruits',
        word: 'CHERRIES'
    },
    {
        category: 'fruits',
        word: 'PAPAYA'
    },
    {
        category: 'fruits',
        word: 'NECTARINE'
    },
    {
        category: 'fruits',
        word: 'PEACH'
    }
]

let random = wordsArr[Math.floor(Math.random() * wordsArr.length)]
let lettersArr = random.word.split(''); 
let category = random.category

const correctArr = [];
let mistake = 0;
const maxMistakes = 6;


function startGame() {
//category
    let catText = $(`
    <p>The category is ${category}</p>
  `).addClass('text-start').appendTo($('.word-container'))

//create random word
$('<div>').addClass('word container pt-4').attr('id', 'selectedWord').appendTo($('.word-container'));
    for(var i =0; i < lettersArr.length; i++) {
        let letter = $('<span>').addClass('letter mx-1').attr('id', i).appendTo($('.word'));
        // .text(letters[i])
    }
//keyboard
    let keyBtns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
          <button
            class="btn btn-outline-light keyLetter m-2"
            id='` + letter + `'
          >
            ` + letter + `
          </button>
        `).join('');
      document.getElementById('keyboard').innerHTML = keyBtns;
};

function checkInput(event) {
    $(this).attr('disabled', true);
    let input = event.target.innerText
    // console.log(input);

    if(lettersArr.includes(input)) {
        // displayHandler(input)
        let i = -1;
        while(i = lettersArr.indexOf(input, i+1), i !== -1) {
            document.getElementById(i).innerHTML = input;
            correctArr.push(i)
            // console.log(correctArr.length);
        }
        checkWin();
    } else {
        mistake++;
        $('.hangman-body-' + mistake).removeClass('hidden').addClass('transition')
        checkLoss();
    }
}

var myModal = document.getElementById('myModal')

function checkWin() {
    let message = 'You won!!'
    if (correctArr.length === lettersArr.length) {
        const winner = document.querySelectorAll('.letter')
        winner.forEach(w => {
            w.classList.add('win');
        })
        gameOver(message);
    };
}

function checkLoss() {
    let message = 'Better luck next time!'
    if(mistake === maxMistakes) {
        gameOver(message);
    }
}

function gameOver(message) {
    $('#myModalHeader').text(message);
    $('#myModal').toggle();
}

startGame();

//keyboard event listener
const keyArr = document.querySelectorAll('.keyLetter')
    keyArr.forEach(function(key) {
    key.addEventListener('click', checkInput)
    });

//modal event listeners
$('#close-modal').click(function() {
    $('#myModal').toggle();
    window.location.reload();
})

$('#replay-btn').click(function() {
    console.log('hi');
    $('#myModal').toggle();
    window.location.reload();
})

