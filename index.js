//question database
"use strict";
const STORE = [
    {
        question: 'Which of the following components is part of the mission of Wolf Park?',
        answers: [
            'Behavioral research',
            'Education',
            'Conservation',
            'Public outreach',
            'All of the above'
        ],
        correctAnswer: 'All of the above'
    },
    {
        question: "What was Erich Klinghammer's goal in starting Wolf Park?",
        answers: [
            'Breed more wolves',
            'Create wolf-dog and other hybrids',
            'Teach wolves to live amongst humans',
            'Teach humans to live amongst wolves',
            'Create a wolf-to-human dictionary of behaviors'
        ],
        correctAnswer: 'Create a wolf-to-human dictionary of behaviors'
    },
    {
        question: 'What other animals reside at Wolf Park?',
        answers: [
            'Foxes',
            'Bison',
            'Coyotes',
            'Rabbits',
            'All of the above'
        ],
        correctAnswer: 'All of the above'
    },
    {
        question: 'How many teeth do wolves have?',
        answers: [
            '42',
            '52',
            '36',
            '60',
            '38'
        ],
        correctAnswer: '42'
    },
    {
        question: 'What behavior is not common to wolves in the wild?',
        answers: [
            'Scent-rolling',
            'Approaching humans',
            'Raising pups',
            'Hunting',
            'Howling'
        ],
        correctAnswer: 'Approaching humans'
    }
];

let score = 0;
let numOfTotal = 0;

function generateQuestion() {
    if (numOfTotal < STORE.length) {
        return createThing(numOfTotal);
    }
    else {
        $('.questionBox').hide();
        finalScore();
        $('.numOfTotal').text(5);
    }
}

function updateScore() {
    score++;
    $('.score').text(score);
}

function updateQuestionNumber() {
    numOfTotal++;
    $('.numOfTotal').text (numOfTotal + 1);
    console.log("updateQuestionNumber() ran")
}

function resetStats() {
    score = 0;
    numOfTotal = 0;
    $('.score').text(0);
    $('.numOfTotal').text(0);
  }

  function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
      $('.startQuiz').hide();
      $('.numOfTotal').text(1);
      $('.questionBox').show();
      $('.questionBox').prepend(generateQuestion());
    });
  }

  function submitAnswer() {
    $('.forestSection').on('submit', function (event) {
      event.preventDefault();
      $('.altBox').hide();
      $('.response').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[numOfTotal].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }

  function createThing(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
    </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
      $(`<label for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
  }

  function correctAnswer() {
    $('.response').html(
      `<h3>Your answer is correct!</h3>
      <img src="Images/correct.jpg" alt="happy wolf" class="images" width="200px">
        <p>Nice job!</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
  }

  function wrongAnswer() {
    $('.response').html(
      `<h3>That's the wrong answer...</h3>
      <img src="Images/incorrect.jpg" alt="embarrassed wolf" class="images" width="200px">
      <p>It's actually:</p>
      <p>${STORE[numOfTotal].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`
    );
  }

  function nextQuestion() {
    $('.forestSection').on('click', '.nextButton', function (event) {
      $('.altBox').hide();
      $('.questionBox').show();
      updateQuestionNumber();
      $('.questionBox form').replaceWith(generateQuestion());
    });
  }

  function finalScore() {
    $('.final').show();
  
    const great = [
      'Great job!',
      'You are doing great and on your way to being part of the pack!'
    ];
  
    const good = [
      'Really, pretty darn good.',
      'Wolves are awesome, right? Keep it up.'
    ];
  
    const bad = [
      'Ouch, you are not ready for this pack.',
      'Sorry, you need more work before you can join the pack.'
    ];
    
    let array;

    if (score >= 4) {
       array = great;
    } else if (score < 4 && score >= 3) {
        array = good;
    } else {
       array = bad;
    }
    return $('.final').html(
      `<h3>${array[0]}</h3>
          <h3>Your score is ${score} / 5</h3>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }
  function restartQuiz() {
    $('.forestSection').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.startQuiz').show();
    });
  }
  function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
  $(makeQuiz);
