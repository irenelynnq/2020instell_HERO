class Sequence {
  constructor(level, index, nextT, nextF) {
    this.level = level;
    this.index = index;
    this.scenes = [];

    this.nextT = nextT;
    this.nextF = nextF;
  }

  getLevel() {
    return this.level;
  }
  getIndex() {
    return this.index;
  }
  getNextT() {
    return this.nextT;
  }
  getNextF() {
    return this.nextF;
  }
  getLength() {
    return this.scenes.length;
  }

  put(scene) {
    this.scenes.push(scene);
  }
  getScene(index) {
    return this.scenes[index];
  }

  getNext(choice) {
    if (this.level == 2 && this.index == 1) {
      if (choice == true) {
        //nemo true
        if (choiceList[killed] == true) {
          return this.nextT; //3.2
        } else {
          return 4;
        }
      } else {
        //nemo false.semo
        return this.nextF; //3.3
      }
    } else {
      //default case
      if (choice == true) {
        return this.nextT;
      } else {
        return this.nextF;
      }
    }
  }

  sequenceKeyPressed() {
    if (keyCode === LEFT_ARROW) {
      //뒤로가기
      if (nowScene.indexL == 1 && nowScene.indexS == 0 && nowScene.index == 2) {
        //1.0.2일때: 선택 체크해 봐야 함
        if (choiceList[killed] == true) {
          //죽인다. 1.0.1.
          sceneIndex -= 1;
          nowScene = nowSequence.getScene(sceneIndex);
          nowScene.playSound();
        } else {
          //살린다 . 1.1.1
          sceneIndex -= 1;
          sequenceIndex = 1;
          nowSequence = sequences[sequenceLevel][sequenceIndex];
          nowScene = nowSequence.getScene(sceneIndex); 
          nowScene.playSound();
        }
      } else if (sceneIndex > 0) {
        //뒤로가기 가능
        sceneIndex -= 1;
        nowScene = nowSequence.getScene(sceneIndex);
        nowScene.playSound();
      }

    } else {
      if (nowScene.isEnd) {
        //이야기 종료
        if (keyCode === ENTER || keyCode === SPACE) {
          gameStat = statEnd;
          ending = nowScene.endType;
          currentBgm.stop();
          currentSoundEffect.stop();
        }
      } else if (nowScene.isBranch) {
        //브랜치 선택
        if (keyCode === ENTER || keyCode === SPACE) {
          this.toNextSequence(nowChoice);
          nowChoice = true;
        } else if (keyCode === UP_ARROW) {
          //선택 변경(위아래로)
          nowChoice = !nowChoice;
        } else if (keyCode === DOWN_ARROW) {
          nowChoice = !nowChoice;
        }

        // if (mouseX >= 45 && mouseX <= 2240) {
        //   if (mouseY >= choice1Y - 21 && mouseY <= choice1Y + 21) {
        //     //choice1의 영역
        //     //nowChoice = true;
        //     this.toNextSequence(true);
        //   } else if (mouseY >= choice2Y - 21 && mouseY <= choice2Y + 21) {
        //     //choice2의 영역
        //     //nowChoice = false;
        //     this.toNextSequence(false);
        //   }
        // }

      } else {
        //다음 씬 존재
        nowScene.sceneKeyPressed();
      }
    }
  }

  toNextSequence(nowChoice) {
    choiceList[this.level] = nowChoice;
    console.log(choiceList[this.level]);
    sequenceLevel += 1;
    sequenceIndex = this.getNext(choiceList[this.level]);
    console.log("choice");
    console.log(sequenceLevel);
    console.log(sequenceIndex);
    nowSequence = sequences[sequenceLevel][sequenceIndex];
    sceneIndex = 0;
    nowScene = nowSequence.getScene(sceneIndex);
  }

}