let numberOfGuesses = 0;
let numberOfLetters = 0;
let guess = [];
let answer = [];
let page = "home";
let topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
let middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
let bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];
let topRowColor = [];
let middleRowColor = [];
let bottomRowColor = [];

function setup() {
  let sketch = createCanvas(600, 800);
  sketch.parent("mycanvas");

  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);

  // loadStrings("Assignments/Words.txt", words => {
  //   answer = random(words).split("");
  // });

  loadFont("Assignments/OpenSans-ExtraBold.ttf", font => {
    textFont(font);
    textSize(40);
    fill("#000000");
    text("Wordle", 300, 385);
    textSize(20);
    drawRow("center", 450, 200, 50, 25, 1, 0, "#000000", "#FFFFFF", "Play");
  });

  loadImage("images/wordle.webp", img => {
    image(img, 300, 300, 100, 100);
  });
}

function mousePressed() {
  if (page == "home") {
    if (mouseX > 200 && mouseX < 400 && mouseY > 425 && mouseY < 475) {
      page = "instructions";

      background("#FFFFFF");
      loadImage("images/instructions.png", img => {
        square(300, 375, 590, 10);
        image(img, 300, 375, 580, 495);
      });
    }
    return;
  }

  if (page == "instructions") {

    page = "game";

    background("#FFFFFF");
    fill("#FFFFFF");
    strokeWeight(2);
    stroke("#d3d6da");

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        square(j * 55 + 190, i * 55 + 100, 48);
      }
    }

    noStroke();
    fill("#d3d6da");
    textSize(20);
    drawRow("center", 500, 40, 55, 5, 10, 8, "#d3d6da", "#000000", ...topRow);
    drawRow("center", 563, 40, 55, 5, 9, 8, "#d3d6da", "#000000", ...middleRow);
    drawRow("center", 626, 40, 55, 5, 7, 8, "#d3d6da", "#000000", ...bottomRow);

    textSize(15);
    drawRow(95, 626, 65, 55, 5, 1, 8, "#d3d6da", "#000000", "ENTER");
    drawRow(505, 626, 65, 55, 5, 1, 8, "#d3d6da", "#000000", "DEL");

    return;
  }

  if (mouseX >= 62.5 && mouseX <= 127.5 && mouseY >= 598.5 && mouseY <= 653.5) {
    userInput("ENTER");
    return;
  }
  if (mouseX >= 472.5 && mouseX <= 537.5 && mouseY >= 598.5 && mouseY <= 653.5) {
    userInput("BACKSPACE");
    return;
  }
  if (mouseY >= 472.5 && mouseY <= 527.5) {
    userInput(topRow[Math.round((mouseX - 84) / 48)]);
    return;
  }
  if (mouseY >= 535.5 && mouseY <= 590.5) {
    userInput(middleRow[Math.round((mouseX - 108) / 48)]);
    return;
  }
  if (mouseY >= 598.5 && mouseY <= 653.5) {
    userInput(bottomRow[Math.round((mouseX - 156) / 48)]);
  }
}

function keyPressed() {
  userInput(key.toUpperCase());
}

function drawLetter(key) {
  fill("#000000");
  textSize(35);
  text(key.toUpperCase(), numberOfLetters * 55 + 190, numberOfGuesses * 55 + 112);
}

function deleteLetter() {
  fill("#FFFFFF");
  stroke("#d3d6da");
  square((numberOfLetters - 1) * 55 + 190, numberOfGuesses * 55 + 100, 48);
  noStroke();
}

function find(element, ...list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      if (element == list[i][j]) {
        return [i, j];
      }
    }
  }
}

function check() {
  let keyboard = [topRow, middleRow, bottomRow];
  let color = ["#787c7e", "#787c7e", "#787c7e", "#787c7e", "#787c7e"];
  let letterGuessed = [false, false, false, false, false];

  for (let i = 0; i < 5; i++) {
    if (guess[i] == answer[i]) {
      letterGuessed[i] = true;
      color[i] = "#6aaa64";
    }
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (answer[j] == guess[i] && color[i] != "#6aaa64" && letterGuessed[j] == false) {
        letterGuessed[j] = true;
        color[i] = "#c9b458";
        break;
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    let keyLocation = find(guess[i], ...keyboard);

    fill(color[i]);
    square(i * 55 + 190, numberOfGuesses * 55 + 100, 50);
    fill("#FFFFFF");
    textSize(35);
    text(guess[i].toUpperCase(), i * 55 + 190, numberOfGuesses * 55 + 112);

    textSize(20);
    if (keyLocation[0] == 0 && topRowColor[keyLocation[1]] != "#6aaa64") {
      if (!(topRowColor[keyLocation[1]] == "#c9b458" && color[i] == "#787c7e")) {
      drawRow(keyLocation[1] * 48 + 84, 500, 40, 55, 5, 1, 0, color[i], "#FFFFFF", guess[i].toUpperCase());
      topRowColor[keyLocation[1]] = color[i];
      }
    }
    if (keyLocation[0] == 1 && middleRowColor[keyLocation[1]] != "#6aaa64") {
      if (!(middleRowColor[keyLocation[1]] == "#c9b458" && color[i] == "#787c7e")) {
      drawRow(keyLocation[1] * 48 + 108, 563, 40, 55, 5, 1, 0, color[i], "#FFFFFF", guess[i].toUpperCase());
      middleRowColor[keyLocation[1]] = color[i];
      }
    }
    if (keyLocation[0] == 2 && bottomRowColor[keyLocation[1]] != "#6aaa64") {
      if (!(bottomRowColor[keyLocation[1]] == "#c9b458" && color[i] == "#787c7e")) {
      drawRow(keyLocation[1] * 48 + 156, 626, 40, 55, 5, 1, 0, color[i], "#FFFFFF", guess[i].toUpperCase());
      bottomRowColor[keyLocation[1]] = color[i];
      }
    }
  }
}

function drawRow(x, y, width, height, cornerRadius, numberOfKeys, spacing, rectColor, textColor, ...output) {
  for (let i = 0; i < numberOfKeys; i++) {
    fill(rectColor);
    if (x == "center") {
      rect(i * (width + spacing) + ((300 - ((numberOfKeys * width + (numberOfKeys - 1) * spacing) / 2)) + width / 2), y, width, height, cornerRadius);
      fill(textColor);
      text(output[i], i * (width + spacing) + ((300 - ((numberOfKeys * width + (numberOfKeys - 1) * spacing) / 2)) + width / 2), y + 5);
    }
    else {
      rect(i * (width + spacing) + x, y, width, height, cornerRadius);
      fill(textColor);
      text(output[i], i * (width + spacing) + x, y + 5);
    }
  }
}

function userInput(inputKey) {
  if (page == "game") {
    if (inputKey == "ENTER" && numberOfLetters == 5) {
      check();
      numberOfGuesses += 1;

      if (guess.join("") == answer.join("")) {
        if (numberOfGuesses == 1) {
          textSize(15);
          drawRow("center", 60, 70, 40, 5, 1, 0, "#000000", "#FFFFFF", "Genius");
        }
        if (numberOfGuesses == 2) {
          textSize(13);
          drawRow("center", 60, 100, 40, 5, 1, 0, "#000000", "#FFFFFF", "Magnificent");
        }
        if (numberOfGuesses == 3) {
          textSize(13);
          drawRow("center", 60, 100, 40, 5, 1, 0, "#000000", "#FFFFFF", "Impressive");
        }
        if (numberOfGuesses == 4) {
          textSize(15);
          drawRow("center", 60, 90, 40, 5, 1, 0, "#000000", "#FFFFFF", "Splendid");
        }
        if (numberOfGuesses == 5) {
          textSize(15);
          drawRow("center", 60, 70, 40, 5, 1, 0, "#000000", "#FFFFFF", "Great");
        }
        if (numberOfGuesses == 6) {
          textSize(15);
          drawRow("center", 60, 70, 40, 5, 1, 0, "#000000", "#FFFFFF", "Phew");
        }
        page = "end";
        return;
      }

      numberOfLetters = 0;
      guess.splice(0, 5);

      if (numberOfGuesses == 6) {
        textSize(15);
        drawRow("center", 60, 70, 40, 5, 1, 0, "#000000", "#FFFFFF", answer.join(""));
        page = "end";
      }
      return;
    }
    if (inputKey == "BACKSPACE" && numberOfLetters > 0 && numberOfLetters < 6) {
      deleteLetter();
      guess.pop();
      numberOfLetters -= 1;
      return;
    }
    if ((keyIsPressed && isLetter() && numberOfLetters < 5) || (mouseIsPressed && numberOfLetters < 5 && inputKey != "BACKSPACE" && inputKey != "ENTER")) {
      drawLetter(inputKey);
      guess.push(inputKey);
      numberOfLetters += 1;
    }
  }
}

function isLetter() {
  if (keyCode >= 65 && keyCode <= 90) {
    return true;
  }
  return false;
}