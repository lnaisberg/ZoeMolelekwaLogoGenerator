let xSlider, ySlider, rSlider;
let sliderCanvas, exportCanvas, canvas;
let myFont, sliderFont;
let txt = "ZOE MOLELEKWA";
let sizeT, strW, tracking, wordW;
let fillCol, strCol;
let letters = [];
let bg = 150;
let maxOffset = 0;
let currHeight;

let x, y, c;
let a = 0;

let xSliderVal, ySliderVal, rSliderVal;

let blackKey = true;
let strokeOn = true;

let topY = y + maxOffset - sizeT;
let bottomY = y + sizeT / 2;

let BNWImage, colorfulImage;


//--------- Colors ----------

let greenCol = "#BAD6A5";
let yellowCol = "#E8EBAB";
let brownCol = "#D7C9B4";
let whiteCol = "#ffffff";
let blackCol = "#000000"

//---------------------------



function preload() {
  myFont = loadFont("assets/PassionOne-Black.ttf");
  sliderFont = loadFont("assets/Satoshi-Regular.ttf");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  sliderCanvas = createGraphics(width, height);
  exportCanvas = createGraphics(width, height);
  currHeight = height;
  exportCanvas.textFont(myFont);
  textAlign(LEFT, CENTER);
  createLetters();
  createSliders();
  cropCanvas.pixelDensity(3);
  exportCanvas.pixelDensity(3);
}

function createSliders() {
  sliderCanvas.fill(0);
  sliderCanvas.textFont(sliderFont);
  sliderCanvas.textSize(14);
  sliderCanvas.noStroke();

  //-------- SLIDERS ----------

  let init = random(width / 10, width);
  xSliderVal = init;
  let xSlider = select("#xSlider");
  xSlider.attribute("min", -width * 0.2);
  xSlider.attribute("max", width * 1.2);
  xSlider.attribute("value", init);

  init = random(50, width / 9);
  ySliderVal = init;
  let ySlider = select("#ySlider");
  ySlider.attribute("min", 0);
  ySlider.attribute("max", width / 6);
  ySlider.attribute("value", init);

  init = random(width / 3);
  rSliderVal = init;
  let rSlider = select("#rSlider");
  rSlider.attribute("min", 0);
  rSlider.attribute("max", width / 3);
  rSlider.attribute("value", init);

  //-------- FILL BUTTONS ----------

  let BNWButton = select("#BNW");
  //BNWButton.style("background-image", 'url("assets/BNW_button.png")');
  BNWButton.mousePressed(makeBNW);

  let greenButton = select("#Green");
  greenButton.style("background-color", greenCol);
  greenButton.mousePressed(makeGreen);

  let yellowButton = select("#Yellow");
  yellowButton.style("background-color", yellowCol);
  yellowButton.mousePressed(makeYellow);
  
  let brownButton = select("#Brown");
  brownButton.style("background-color", brownCol);
  brownButton.mousePressed(makeBrown);

  let whiteButton = select("#White");
  whiteButton.style("background-color", whiteCol);
  whiteButton.mousePressed(makeWhite);
  
  let colorfulButton = select("#Colorful");
  colorfulButton.style("background-image", 'url("assets/colorful_button.png")');
  colorfulButton.mousePressed(makeColorful);

  //-------- STROKE BUTTONS ----------

  let strokeButton = select("#Stroke");
  strokeButton.style("background-color", blackCol);
  strokeButton.mousePressed(addStroke);

  let removeStrokeButton = select("#removeStroke");
  removeStrokeButton.style(
    "background-image",
    'url("assets/noStr_button.png")'
  );
  removeStrokeButton.mousePressed(removeStroke);

  //-------- DOWNLOAD BUTTON ----------

  let downloadButton = select("#downloadBtn");
  downloadButton.mousePressed(savePNG);

  //-------- CROP CANVAS ----------

  cropCanvas = createGraphics(width, ySliderVal);
}

function updateX(val) {
  xSliderVal = parseInt(val);
}

function updateY(val) {
  ySliderVal = parseInt(val);
}

function updateR(val) {
  rSliderVal = parseInt(val);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
  setup();
}

function draw() {
  exportCanvas.clear();
  background(bg);

  resetVars();
  setKerning();
  
  // img()

  for (let i = 0; i < letters.length; i++) {
    if (blackKey) {
      letters[i].blackKey();
    }
    letters[i].updateY();
    letters[i].show();
  }

  // ------- CROP & COPY ----------

  topY = y + maxOffset - sizeT;
  bottomY = y + sizeT / 2;

  // line(0, bottomY, width, bottomY);
  // line(0, topY, width, topY);

  let yDif = bottomY - topY;
  cropCanvas.resizeCanvas(width, yDif);
  
  cropCanvas.copy(exportCanvas, 0, int(topY), width, int(yDif), 0, 0, width, int(yDif));

  // ------- SHOW ON SCREEN ----------

  image(sliderCanvas, 0, 0, windowWidth, windowHeight);
  image(exportCanvas, 0, 0);
  //image(cropCanvas, 0, 0);
}

function resetVars() {
  sizeT = 0.1 * windowWidth;
  strW = width / 300;
  exportCanvas.strokeWeight(strW);
  exportCanvas.textSize(sizeT);
  y = (exportCanvas.height * 3) / 4;
  a = 0;
}

function createLetters() {
  y = height / 2;
  fillCol = 255;
  strCol = 0;

  for (let i = 0; i < txt.length; i++) {
    c = txt.charAt(i);
    letters[i] = new Letter(c, x, y, fillCol, strCol, sizeT, strW);
  }
}

function setKerning(i) {
  tracking = 0.002;
  x = 0.12 * width;
  for (let i = 0; i < letters.length; i++) {
    c = txt.charAt(i);
    letters[i].x = x;
    letters[i].centerX = x + exportCanvas.textWidth(c) / 2;

    //height
    letters[i].y = (currHeight * 3) / 4;
    // letters[i].y = (height * 3) / 4;

    if (i == 0) {
      a = 0.002 * width * -1;
    } else if (i == txt.length - 3) {
      a = -0.003 * width;
    } else if (i == txt.length - 2) {
      a = -0.004 * width;
    }
    x = x + exportCanvas.textWidth(c) + tracking * width - a;
  }
  wordW = x - tracking;
}

function makeBNW() {
  blackKey = true;
  for (let i = 0; i < letters.length; i++) {
    letters[i].strCol = color("#00000000");
    letters[i].fillCol = color(whiteCol);
    if (strokeOn) {
      //letters[i].strCol = color('#000000');
      letters[i].blackKey();
    }
  }
}

function makeGreen() {
  blackKey = false;
  for (let i = 0; i < letters.length; i++) {
    letters[i].strCol = color("#00000000");
    letters[i].fillCol = color(greenCol);
    if (strokeOn) {
      letters[i].strCol = color(blackCol);
    }
  }
}

function makeYellow() {
  blackKey = false;
  for (let i = 0; i < letters.length; i++) {
    letters[i].strCol = color("#00000000");
    letters[i].fillCol = color(yellowCol);
    if (strokeOn) {
      letters[i].strCol = color(blackCol);
    }
  }
}

function makeBrown() {
  blackKey = false;
  for (let i = 0; i < letters.length; i++) {
    letters[i].strCol = color("#00000000");
    letters[i].fillCol = color(brownCol);
    if (strokeOn) {
      letters[i].strCol = color(blackCol);
    }
  }
}

function makeWhite() {
  blackKey = false;
  for (let i = 0; i < letters.length; i++) {
    letters[i].strCol = color("#00000000");
    letters[i].fillCol = color(whiteCol);
    if (strokeOn) {
      letters[i].strCol = color(blackCol);
    }
  }
}

function makeColorful() {
  blackKey = false;
  let counter = 0;
  for (let i = 0; i < letters.length; i++) {
    letters[i].strCol = color("#00000000");
    if(counter == 0){
      letters[i].fillCol = color(greenCol);
      counter ++;
    } else if(counter == 1){
      letters[i].fillCol = color(yellowCol);
      counter ++;
    } else if(counter == 2){
      letters[i].fillCol = color(brownCol);
      counter = 0;
    }
    if (strokeOn) {
      letters[i].strCol = color(blackCol);
    }
  }
}

function addStroke() {
  strokeOn = true;
  for (let i = 0; i < letters.length; i++) {
    letters[i].strCol = color(blackCol);
    if (blackKey) {
      letters[i].blackKey();
    }
  }
}

function removeStroke() {
  strokeOn = false;
  bg = 150;
  for (let i = 0; i < letters.length; i++) {
    letters[i].strCol = color("#00000000");
    if (blackKey) {
      letters[i].blackKey();
    }
  }
}

class Letter {
  constructor() {
    this.c = c;
    this.x = x;
    this.y = y;
    this.fillCol = fillCol;
    this.strCol = strCol;
    this.sizeT = sizeT;
    this.strW = strW;
    this.centerX = x + textWidth(this.c) / 2;
  }

  blackKey() {
    let posX = xSliderVal;
    let rangeLow = this.centerX - exportCanvas.textWidth(this.c) / 1.9;
    let rangeHigh = this.centerX + exportCanvas.textWidth(this.c) / 1.9;

    if (posX > rangeLow && posX < rangeHigh) {
      this.fillCol = 0;
      if (strokeOn) {
        this.strCol = 255;
      } else {
        this.strCol = color("#00000000");
      }
    } else {
      this.fillCol = 255;
      this.strCol = 0;
      if (strokeOn) {
        this.strCol = 0;
      } else {
        this.strCol = color("#00000000");
      }
    }
  }

  updateY() {
    let posX = xSliderVal;
    let curveAmount = ySliderVal; // Adjust the curve amount as desired
    let maxDistance = rSliderVal; // Maximum distance for letters to be affected by the curve

    for (let i = 0; i < letters.length; i++) {
      let currentLetter = letters[i];
      let distanceToMouseX = exportCanvas.abs(currentLetter.centerX - posX);

      if (distanceToMouseX <= maxDistance) {
        let offsetY =
          curveAmount *
          exportCanvas.pow(1 - distanceToMouseX / maxDistance, 2) *
          -1;
        currentLetter.y = y + offsetY;
        if (offsetY < maxOffset) {
          maxOffset = offsetY;
        }
      }
    }
  }

  show() {
    exportCanvas.fill(this.fillCol);
    exportCanvas.stroke(this.strCol);
    exportCanvas.text(this.c, this.x, this.y);
  }
}

function savePNG() {
  saveCanvas(cropCanvas, "Zoe_Molelekwa_Logo.png");
}
