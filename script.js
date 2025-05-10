const questionContainer = document.getElementById("questionContainer");
const submitBtn = document.getElementById("submitBtn");
const generateBtn = document.getElementById("generateBtn");
const questionCountInput = document.getElementById("questionCount");

function renderQuestions(count) {
  questionContainer.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    if (i > 1 && (i - 1) % 5 === 0) {
      const divider = document.createElement("div");
      divider.className = "divider";
      questionContainer.appendChild(divider);
    }

    const question = document.createElement("div");
    question.className = "question";

    const title = document.createElement("div");
    title.className = "question-title";
    title.textContent = `${i}. `;

    const options = document.createElement("div");
    options.className = "options";

    for (let j = 1; j <= 4; j++) {
      const option = document.createElement("div");
      option.className = "option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q${i}`;
      radio.value = j;

      option.appendChild(radio);

      options.appendChild(option);
    }

    question.appendChild(title);
    question.appendChild(options);
    questionContainer.appendChild(question);
  }
}

function handleSubmit() {
  const count = Number(questionCountInput.value);
  const answers = {};

  for (let i = 1; i <= count; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    answers[`q${i}`] = selected ? selected.value : null;
  }

  console.log("답안:", answers);
  alert("제출되었습니다. 콘솔에서 확인하세요.");
}

generateBtn.addEventListener("click", () => {
  const count = Number(questionCountInput.value);
  if (isNaN(count) || count < 1) {
    alert("문제 수를 올바르게 입력해주세요.");
    return;
  }
  renderQuestions(count);
});

submitBtn.addEventListener("click", handleSubmit);

// 초기 렌더링
renderQuestions(Number(questionCountInput.value));
