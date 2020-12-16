//const
const endSquareCircle = 1;
const endSquare = 2;
const endCircle = 3;
const endTriangle = 4;
const endFail = 5;

const statMain = 0;
const statHowToPlay = 1;
const statPlaying = 2;
const statEnd = 3;
const statCredit = 4;
const statCredit2 = 5;

//choices
let choiceList = [];
const killed = 0;
const said = 1;
const nemo = 2;
const ally1 = 3;
const ally2 = 4;

//images
let images = [];
let imageCount = 168;

let messageBar;
let nextButton;
let nameTags = [];
let choiceButton;

let endingCredit;
let endingCredit2;
let howToPlay;
let mainCover;
let endings = [];


//font
let nanum;

//data
let sequences = [];
let sequenceTable;
let sceneTable;
let bgms = [];
let soundEffects;
let testSound;

//const
const choice1Y = 612;
const choice2Y = 655;
const SPACE = 32;


//vars
let sequenceLevel;
let sequenceIndex;
let sceneIndex;
let nowSequence;
let nowScene;
let nowChoice;
let timeStandard;
let currentBgm;
let currentSoundEffect;

let ending;
let gameStat;


function preload() {
  soundEffects = {};
  nanum = loadFont('assets/etc/NanumSquareRoundB.ttf');
  preloadUI();
  preloadImages();
  preloadEtc();
  preloadSequenceData();
  preloadSceneData();
  soundFormats('mp3', 'ogg');
  preloadSound();
}

function setup() {
  console.log("start");
  createCanvas(1280, 720);
  textFont(nanum);
  textSize(24);
  textLeading(32);
  gameStat = statMain;
  ending = 0;

  //실험용
  choiceList.push(true);
  choiceList.push(true);
  choiceList.push(true);
  choiceList.push(true);
  choiceList.push(true);

  //원래 리스트
  // choiceList.push(true);
  // choiceList.push(false);
  // choiceList.push(false);
  // choiceList.push(true);
  // choiceList.push(false);

  sequenceLevel = 0;
  sequenceIndex = 0;
  sceneIndex = 0;
  nowChoice = true;

  nowSequence = sequences[sequenceLevel][sequenceIndex];
  console.log(nowSequence.getLevel());
  console.log(nowSequence.getIndex());
  nowScene = nowSequence.getScene(sceneIndex);

}

function draw() {
  background(220);
  switch (gameStat) {
    case statMain:
      drawMain();
      break;
    case statHowToPlay:
      drawHowToPlay();
      break;
    case statPlaying:
      nowScene.drawScene();
      break;
    case statEnd:
      drawEnding(ending);
      break;
    case statCredit:
      drawCredit(1);
      break;
    case statCredit2:
      drawCredit(2);
      break;
  }
}

function keyPressed() {
  switch (gameStat) {
    case statMain:
      if (keyCode === ENTER) {
        gameStat = statHowToPlay;
      }
      break;
    case statHowToPlay:
      if (keyCode === ENTER) {
        gameStat = statPlaying;
        currentBgm = bgms[0];
        currentBgm.loop();
        currentSoundEffect = soundEffects['Absorbing'];
      }
      break;
    case statPlaying:
      nowSequence.sequenceKeyPressed();
      break;
    case statEnd:
      if (keyCode === ENTER) {
        gameStat = statCredit;
      }
      break;
    case statCredit:
      if (keyCode === ENTER) {
        gameStat = statCredit2;
      }
      break;
    case statCredit2:
      if (keyCode === ENTER) {
        restart();
      }
      break;
  }
}

function countSec(standard) {
  return int((millis() - standard) / 1000);
  // if(millis() >= standard + (sec * 1000)) {
  //   return true;
  // } else {
  //   return false;
  // }
}

function drawEnding(end) {
  imageMode(CORNER);
  image(endings[end - 1], 0, 0, 1280, 720);
}

function drawMain() {
  imageMode(CORNER);
  image(mainCover, 0, 0, 1280, 720);
}

function drawHowToPlay() {
  imageMode(CORNER);
  image(howToPlay, 0, 0, 1280, 720);
}

function drawCredit(num) {
  imageMode(CORNER);
  if (num == 1) {
    image(endingCredit, 0, 0, 1280, 720);
  } else if (num == 2){
    image(endingCredit2, 0, 0, 1280, 720);
  }

}

function restart() {
  console.log("restart");
  textSize(24);
  textLeading(32);
  gameStat = statMain;
  ending = 0;

  sequenceLevel = 0;
  sequenceIndex = 0;
  sceneIndex = 0;
  nowChoice = true;

  currentBgm.stop();

  nowSequence = sequences[sequenceLevel][sequenceIndex];
  console.log(nowSequence.getLevel());
  console.log(nowSequence.getIndex());
  nowScene = nowSequence.getScene(sceneIndex);

}

function preloadUI() {
  messageBar = loadImage('assets/ui/MessageBar.png');
  nextButton = loadImage('assets/ui/NextButton.png');
  choiceButton = loadImage('assets/ui/ChoiceButton.png');
  nameTags.push(loadImage('assets/ui/nametag/NameTag.png'));
  for (let i = 1; i < 15; i++) {
    nameTags.push(loadImage('assets/ui/nametag/nameTag' + i + '.png'));
  }
}

function preloadEtc() {
  endingCredit = loadImage('assets/ui/EndingCredit.png');
  endingCredit2 = loadImage('assets/ui/EndingCredit2.png');
  howToPlay = loadImage('assets/ui/HowToPlay.png');
  mainCover = loadImage('assets/ui/MainCover.png');

  console.log("load Image");

  endings.push(loadImage('assets/ui/TheEndSquareCircle.png'));
  endings.push(loadImage('assets/ui/TheEndSquare.png'));
  endings.push(loadImage('assets/ui/TheEndCircle.png'));
  endings.push(loadImage('assets/ui/TheEndTriangle.png'));
  endings.push(loadImage('assets/ui/TheEndFail.png'));

  console.log(endings.length);
}

function preloadImages() {
  for (let i = 0; i < imageCount; i++) {
    images.push(loadImage('assets/sceneImages/image' + i + '.png'));
  }
}

function preloadSequenceData() {
  sequenceTable = loadTable('assets/data/heroSequenceData.csv', 'csv', 'header', loadSequence);
}

function preloadSceneData() {
  sceneTable = loadTable('assets/data/heroSceneData.csv', 'csv', 'header', loadScene)
}

function loadSequence() {
  let level = -1;
  for (let r = 0; r < sequenceTable.getRowCount(); r++) {
    if (sequenceTable.getNum(r, 0) > level) {
      //new level
      let list = [];
      sequences.push(list);
      level += 1;
      console.log("level " + level + " list");
    }
    sequences[level].push(new Sequence(sequenceTable.getNum(r, 0), sequenceTable.getNum(r, 1), sequenceTable.getNum(r, 2), sequenceTable.getNum(r, 3)));
  }

}

function loadScene() {
  for (let r = 0; r < sceneTable.getRowCount(); r++) {

    let indexL = sceneTable.getNum(r, 1);
    let indexS = sceneTable.getNum(r, 2);
    //console.log(r + " " + indexL + " " + indexS);
    sequences[indexL][indexS].put(new Scene(indexL, indexS, sceneTable.getNum(r, 3), sceneTable.getNum(r, 4), sceneTable.getNum(r, 5), sceneTable.getNum(r, 6), sceneTable.getNum(r, 7), sceneTable.getNum(r, 8), sceneTable.getNum(r, 9), sceneTable.getString(r, 10), sceneTable.getNum(r, 11), sceneTable.getString(r, 12), sceneTable.getString(r, 13), sceneTable.getString(r, 14), sceneTable.getString(r, 15)));
  }

}

function preloadSound() {
  bgms[0] = loadSound('assets/sound/bgm/0Normal.mp3');
  bgms[1] = loadSound('assets/sound/bgm/1Happy.mp3');
  bgms[2] = loadSound('assets/sound/bgm/2Tension.mp3');
  bgms[3] = loadSound('assets/sound/bgm/3Sad.mp3');
  bgms[4] = loadSound('assets/sound/bgm/4BackNormal.mp3');
  bgms[5] = loadSound('assets/sound/bgm/5Searching.mp3');
  bgms[6] = loadSound('assets/sound/bgm/6ChanceReal.mp3');
  bgms[7] = loadSound('assets/sound/bgm/7NemoEnding.mp3');
  bgms[8] = loadSound('assets/sound/bgm/8SemoEnding.mp3');
  bgms[9] = loadSound('assets/sound/bgm/9CircleEnding.mp3');
  bgms[10] = loadSound('assets/sound/bgm/10Tension2.mp3');
  soundEffects['Absorbing'] = loadSound('assets/sound/se/Absorbing.mp3');
  soundEffects['CircleMurmur'] = loadSound('assets/sound/se/CircleMurmur.mp3');
  soundEffects['Cheering'] = loadSound('assets/sound/se/Cheering.mp3');
  soundEffects['DoorClose'] = loadSound('assets/sound/se/DoorClose.mp3');
  soundEffects['DoorOpen'] = loadSound('assets/sound/se/DoorOpen.mp3');
  soundEffects['EnergyReturn'] = loadSound('assets/sound/se/EnergyReturn.mp3');
  soundEffects['Footsteps'] = loadSound('assets/sound/se/Footsteps.mp3');
  soundEffects['LightPang'] = loadSound('assets/sound/se/LightPang.mp3');
  soundEffects['MovingSound'] = loadSound('assets/sound/se/MovingSound.mp3');
  soundEffects['NemoArmyGo'] = loadSound('assets/sound/se/NemoArmyGo.mp3');
  soundEffects['NemoMurmur'] = loadSound('assets/sound/se/NemoMurmur.mp3');
  soundEffects['Running'] = loadSound('assets/sound/se/Running.mp3');
  soundEffects['SemoAngry'] = loadSound('assets/sound/se/SemoAngry.mp3');
  soundEffects['SemoArmyGo'] = loadSound('assets/sound/se/SemoArmyGo.mp3');
  soundEffects['SemoScream'] = loadSound('assets/sound/se/SemoScream.mp3');
  soundEffects['SemoSurprised'] = loadSound('assets/sound/se/SemoSurprised.mp3');
  soundEffects['SemoWaggle'] = loadSound('assets/sound/se/SemoWaggle.mp3');
  soundEffects['SemoWoongsung'] = loadSound('assets/sound/se/SemoWoongsung.mp3');
  soundEffects['SpearSword'] = loadSound('assets/sound/se/SpearSword.mp3');
  soundEffects['SpearSwordFight'] = loadSound('assets/sound/se/SpearSwordFight.mp3');
  soundEffects['Stabbing'] = loadSound('assets/sound/se/Stabbing.mp3');
  soundEffects['StookySobbing'] = loadSound('assets/sound/se/StookySobbing.mp3');
  soundEffects['Stuffswarr'] = loadSound('assets/sound/se/Stuffswarr.mp3');
  soundEffects['Swirl'] = loadSound('assets/sound/se/Swirl.mp3');
  soundEffects['SwordFight'] = loadSound('assets/sound/se/SwordFight.mp3');
  soundEffects['SpearSwordFight'] = loadSound('assets/sound/se/SpearSwordFight.mp3');
  soundEffects['Tra1stMurmur'] = loadSound('assets/sound/se/Tra1stMurmur.mp3');
  soundEffects['WaveSound'] = loadSound('assets/sound/se/WaveSound.mp3');
  console.log("sound");
}
