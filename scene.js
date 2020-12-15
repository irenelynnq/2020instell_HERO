class Scene {
  constructor(indexL, indexS, index, isBranch, end, nameTagType, hasLine, bgm, hasSoundEffect, soundEffectName, artIndex, speaker, line, branch1Line, branch2Line) {
    this.indexL = indexL;
    this.indexS = indexS;
    this.index = index;
    if (isBranch == 0) {
      this.isBranch = false;
    } else {
      this.isBranch = true;
    }
    if (end == 0) {
      this.isEnd = false;
      this.endType = 0;
    } else {
      this.isEnd = true;
      this.endType = end;
    }
    this.nameTagType = nameTagType;
    if (hasLine == 0) {
      this.hasLine = false;
    } else {
      this.hasLine = true;
    }
    this.bgm = bgm;
    if (hasSoundEffect == 0) {
      this.hasSoundEffect = false;
    } else {
      this.hasSoundEffect = true;
    }
    this.soundEffectName = soundEffectName;
    this.artIndex = artIndex;
    this.speaker = speaker;
    this.line = line;
    this.branch1Line = branch1Line;
    this.branch2Line = branch2Line;
  }

  drawScene() {
    imageMode(CORNER);
    image(images[this.artIndex], 0, 0, 1280, 720);
    if (this.isBranch) {
      this.drawLineBox();
      this.writeChoices();
      if (this.nameTagType != 0) {
        this.drawSpeakerBox();
        this.writeSpeaker();
      }
      if (nowChoice) {
        //true. choice1
        imageMode(CENTER);
        image(choiceButton, 90, choice1Y);
      } else {
        //false. choice2
        imageMode(CENTER);
        image(choiceButton, 90, choice2Y);
      }

      //타이머
      // let secLeft = 10 - countSec(timeStandard);
      // console.log("secLeft" + secLeft);
      // if (secLeft < 0) {
      //   nowSequence.toNextSequence(nowChoice);
      // } else {
      //   textAlign(CENTER, CENTER);
      //   fill(255);
      //   textSize(32);
      //   text(secLeft, width / 2, height / 2);
      // }



      //이 아래로 무시

      // if (mouseX >= 45 && mouseX <= 2240) {
      //   if (mouseY >= choice1Y - 21 && mouseY <= choice1Y + 21) {
      //     //choice1의 영역
      //     //nowChoice = true;
      //     imageMode(CENTER);
      //     image(choiceButton, 90, choice1Y);
      //   } else if (mouseY >= choice2Y - 21 && mouseY <= choice2Y + 21) {
      //     //choice2의 영역
      //     //nowChoice = false;
      //     imageMode(CENTER);
      //     image(choiceButton, 90, choice2Y);
      //   }
      // }
    } else {
      if (this.hasLine) {
        this.drawLineBox();
        this.writeLine();
        if (this.nameTagType != 0) {
          this.drawSpeakerBox();
          this.writeSpeaker();
        }
      }
      //this.drawNextButton();
    }
  }

  drawLineBox() {
    imageMode(CORNER);
    image(messageBar, 45, 555);
  }
  drawSpeakerBox() {
    imageMode(CORNER);
    image(nameTags[this.nameTagType], 98, 510);
  }
  drawNextButton() {
    imageMode(CORNER);
    image(nextButton, 1178, 628);
  }

  writeLine() {
    textAlign(LEFT, TOP);
    fill(0);
    textSize(24);
    text(this.line, 82, 597, 1116);
  }
  writeSpeaker() {
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(24);
    text(this.speaker, 199, 543);
  }
  writeChoices() {
    textAlign(LEFT, CENTER);
    fill(0);
    textSize(24);
    text(this.branch1Line, 120, choice1Y);
    text(this.branch2Line, 120, choice2Y);
  }

  sceneKeyPressed() {
    // if (mouseX >= 1178 && mouseX <= 1216 && mouseY >= 628 && mouseY <= 673)
    if (keyCode === ENTER || keyCode === SPACE) {
      //next button clicked
      if (this.indexL == 1 && this.indexS == 1 && this.index == 1) {
        //살린다를 선택함. 두개만 보여주고 돌아가기
        sequenceIndex = 0;
        sceneIndex += 1;
        nowSequence = sequences[1][sequenceIndex];
        nowScene = nowSequence.getScene(sceneIndex);
        nowScene.playSound();
      } else {
        sceneIndex += 1;
        nowScene = nowSequence.getScene(sceneIndex);
        nowScene.playSound();
        if (nowScene.isBranch) {
          //타임 기준 설정
          timeStandard = millis();
          //console.log(timeStandard);
        }
      }

    }
  }

  playSound(){
    this.playBgm();
    this.playSoundEffect();
  }

  playBgm(){
    if (bgms[this.bgm] != currentBgm) {
      currentBgm.stop();
      currentBgm = bgms[this.bgm];
      currentBgm.loop();
    }
  }

  playSoundEffect(){
    if (this.hasSoundEffect) {
      currentSoundEffect.stop();
      currentSoundEffect = soundEffects[this.soundEffectName];
      currentSoundEffect.play();
      console.log(this.soundEffectName);
    } else {
      currentSoundEffect.stop();
    }
  }
}
