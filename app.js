```javascript
let currentQuestion = 0;

let correctAnswers =
Number(localStorage.getItem("correctAnswers")) || 0;

let wrongAnswers =
Number(localStorage.getItem("wrongAnswers")) || 0;

let errorQuestions =
JSON.parse(localStorage.getItem("errorQuestions")) || [];

updateStats();

function showHome(){

    hideAll();

    document
    .getElementById("homePage")
    .classList
    .remove("hidden");
}

function showQuiz(){

    hideAll();

    document
    .getElementById("quizPage")
    .classList
    .remove("hidden");

    renderQuestion();
}

function showStats(){

    hideAll();

    document
    .getElementById("statsPage")
    .classList
    .remove("hidden");

    updateStats();
}

function showReview(){

    hideAll();

    document
    .getElementById("reviewPage")
    .classList
    .remove("hidden");

    renderReview();
}

function hideAll(){

    document
    .getElementById("homePage")
    .classList
    .add("hidden");

    document
    .getElementById("quizPage")
    .classList
    .add("hidden");

    document
    .getElementById("statsPage")
    .classList
    .add("hidden");

    document
    .getElementById("reviewPage")
    .classList
    .add("hidden");
}

function renderQuestion(){

    const q = questions[currentQuestion];

    let html = `
        <h2>${q.tema}</h2>
        <br>

        <div class="question">
            ${q.question}
        </div>
    `;

    q.options.forEach((option,index)=>{

        html += `
        <button
            class="option"
            onclick="checkAnswer(${index})"
        >
            ${option}
        </button>
        `;

    });

    html += `
        <div id="feedback"></div>
    `;

    document
    .getElementById("questionContainer")
    .innerHTML = html;
}

function checkAnswer(index){

    const q = questions[currentQuestion];

    const feedback =
    document.getElementById("feedback");

    if(index === q.correct){

        correctAnswers++;

        localStorage.setItem(
            "correctAnswers",
            correctAnswers
        );

        feedback.innerHTML = `
        <div class="feedback">

        <h3 style="color:#22c55e">
        ✅ Correto
        </h3>

        <br>

        ${q.explanation}

        <br><br>

        <button
        class="menu-item"
        onclick="nextQuestion()">

        Próxima Questão

        </button>

        </div>
        `;

    }else{

        wrongAnswers++;

        localStorage.setItem(
            "wrongAnswers",
            wrongAnswers
        );

        errorQuestions.push(q);

        localStorage.setItem(
            "errorQuestions",
            JSON.stringify(errorQuestions)
        );

        feedback.innerHTML = `
        <div class="feedback">

        <h3 style="color:#ef4444">
        ❌ Incorreto
        </h3>

        <br>

        ${q.explanation}

        <br><br>

        <button
        class="menu-item"
        onclick="nextQuestion()">

        Próxima Questão

        </button>

        </div>
        `;

    }

    updateStats();
}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= questions.length){

        currentQuestion = 0;
    }

    renderQuestion();
}

function updateStats(){

    document.getElementById(
        "correctCount"
    ).innerText = correctAnswers;

    document.getElementById(
        "wrongCount"
    ).innerText = wrongAnswers;

    document.getElementById(
        "totalCount"
    ).innerText =
    correctAnswers + wrongAnswers;
}

function renderReview(){

    const container =
    document.getElementById(
        "reviewContainer"
    );

    if(errorQuestions.length===0){

        container.innerHTML =
        "Nenhuma questão errada.";

        return;
    }

    let html="";

    errorQuestions.forEach(q=>{

        html += `
        <div class="card">

            <h3>${q.tema}</h3>

            <br>

            ${q.question}

            <br><br>

            <strong>
            Explicação:
            </strong>

            <br>

            ${q.explanation}

        </div>
        `;

    });

    container.innerHTML = html;
}

showHome();
```
