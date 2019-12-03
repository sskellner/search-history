/********************************************************/
/* Concordance (& 'concordance.js') filters the dataset */
/* by the keyword you entered.                          */
/********************************************************/
function process(txt, all, dates) {
  var concordance = new Concordance();
  concordance.newProcess(txt, all, dates);
  concordance.sortByDate();
  currentConcordance = concordance;
  var keys = currentConcordance.getKeys();
  for (var i = 0; i < keys.length; i++) {
    datesToShow.push(concordance.getDate(keys[i]));
  }
  setColorsandRotate(keys);
  readyToPlot = true;
}

/********************************************************/
/* Lots of global variables. Probably not the most      */
/* graceful way to do everything, but it works!         */
/********************************************************/
var input, searchButton, luckyButton, clearButton;
var readyToPlot = false;
var currentIndices = [];
var datesToShow = [];
var currentConcordance;
var defaultText = 'google search history';
var checkAgainst = '';
var datesColumn = [];

/********************************************************/
/* Load the dataset. For my own privacy I have not put  */
/* my personal dataset on GitHub, but I have included   */
/* it in my assignment submission on Canvas.            */
/********************************************************/
function preload() {
  table = loadTable('assets/searchesAndDates.csv', 'csv', 'header', fileLoaded);
}

/********************************************************/
/* Create all the responsive html elements & their      */
/* event handlers                                       */
/********************************************************/
function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  logoImage = createImg('assets/StacyLogo.png','the Stacy/Google logo');
  logoImage.parent('logo');
  logoImage.style('width','100%');
  logoImage.style('margin-top', '10px');
  logoImage.style('margin-bottom', '10px');

  inputSearch = createInput(defaultText);
  inputSearch.parent('inputfield');
  inputSearch.style('border-radius', '25px');
  inputSearch.style('border', '2px solid #e5e5e5');
  inputSearch.style('padding', '10px');
  inputSearch.style('height','15px');
  inputSearch.style('margin-bottom', '10px');
  inputSearch.style('width','90%');
  input = inputSearch;

  searchButton = createButton('Search');
  searchButton.parent('buttons');
  searchButton.style('border-radius', '5px');
  searchButton.style('background','#e5e5e5');
  searchButton.style('padding','8px 12px');
  searchButton.style('float','left');

  luckyButton = createButton('I\'m Feeling Lucky');
  luckyButton.parent('buttons');
  luckyButton.style('border-radius', '5px');
  luckyButton.style('background','#e5e5e5');
  luckyButton.style('padding','8px 12px');
  luckyButton.style('float','right');

  searchButton.mousePressed(handleSearchInput);
  luckyButton.mousePressed(handleLuckyInput);
}

/********************************************************/
/* Draw everything!                                     */
/********************************************************/
function draw() {
  if (readyToPlot) {
    clear();
    fill('gray');
    let cursor = ellipse(mouseX,100, 8, 8);
    for (let i=0; i<currentConcordance.getIndices().length; i++) {
      let result = currentConcordance.getIndices()[i];
      let searchText = currentConcordance.getKeys()[i];
      let inputLength = searchText.length;
      let date = currentConcordance.dict[searchText];

      // 10413 is the length of the whole dataset; hard coded so it runs faster.
      //if you use a different dataset, update 10413 to the length of yours.
      let xpos = int(map(currentConcordance.getIndices()[i], 0, 10413, 10, width-20));
      drawWord(inputLength, xpos, searchText, colorChoice[i], date, yChoice[i]);
    }
  }
}

// for choosing random letter orientation, word rotation, & colors
let colorChoice = [];
let rotateChoices = {};
let yChoice = [];

function setColorsandRotate(arr) {
  let yOptions = [35, 40, 45, 50, 55, 60, 65];
  console.log(arr.length);
  let colors = ['#4688F1', '#E8453C', '#FABB2D', '#3AA757'];
  for (let i=0; i < arr.length; i++) {
    let cc = int(random(0, 4));
    let yc = int(random(0,7));
    colorChoice.push(colors[cc]);
    yChoice.push(yOptions[yc]);
    let currentWord = arr[i];
    rotateChoices[currentWord] = [];
    for (let j=0; j<currentWord.length; j++) {
      rotateChoices[currentWord].push(random(-1, 1));
    }
  }
}

//for animation & interaction
//'a' goes into lerp function to animate rotation
//'drawWord' arguments are abbreviated from line 97
let a = 90;

function drawWord(i, x, s, c, date, y) {
  let d = dist(mouseX, mouseY, x, mouseY);
  fill(c);
  noStroke();
  textFont('Nunito Sans');
  textStyle(BOLD);
  textSize(14);
  angleMode(DEGREES);
  if (d<3) {
    if (mouseIsPressed) {
      let dmy = date.substr(0,date.indexOf(" "));
      fill('white');
      rect(x+8, 85, 80, 20);
      fill('gray');
      text(dmy, x+15, 100);
      push();
      translate(x, 110);
      textAlign(LEFT);
      fill(c);
      a = lerp(a, 0, 0.05);
      rotate(a);
      text(s, 10, 0-y);
      pop();
    } else {
      push();
      translate(x, 110);
      rotate(90);
      text(s, 0, 0);
      pop();
    }
  } else {
    for (let j=0; j<i; j++) {
      push();
      translate(x, 120+j*10);
      angleMode(RADIANS);
      rotate(rotateChoices[s][j]);
      textAlign(LEFT);
      text(s[j], 0,0);
      pop();
    }
  }
}

//Stops animation
function mouseReleased() {
  a = 90;
}


// When the file is loaded
function fileLoaded(data) {
  var searchesCol = data.getColumn("search");
  var datesCol = data.getColumn("datetime");
  checkAgainst = searchesCol;
  datesColumn = datesCol;
}

// Handle the text input field
function handleSearchInput() {
  process(input.value(), checkAgainst, datesColumn);
}

// Customize this list to make your own "Feeling Lucky" options.
// Could even use the entire dataset! Go crazy!
feelingLucky = ['cambridge', 'lake tahoe', 'california', 'pittsburgh', 'jobs','new york', 'fun ', ' burlington '];

function handleLuckyInput() {
  let choice = int(random(feelingLucky.length));
  console.log(feelingLucky[choice]);
  input.value(feelingLucky[choice]);
  process(feelingLucky[choice], checkAgainst, datesColumn);
}
