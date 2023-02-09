let cardPack;
let callContinue = null;
let deckCard = [];
removeOldCard();

function readyGame(){
    callContinue = 0;
    deckCard = [];
    let callBtn = document.querySelector(".box8").addEventListener("click",runGame);
    let foldBtn = document.querySelector(".box9").addEventListener("click",removeOldCard);
}
function removeOldCard(){
    removeBg(".suits1",".ranks1",".box1");
    removeBg(".suits2",".ranks2",".box2");
    removeBg(".suits3",".ranks3",".box3");
    removeBg(".suits4",".ranks4",".box4");
    removeBg(".suits5",".ranks5",".box5");
    removeBg(".suits6",".ranks6",".box6");
    removeBg(".suits7",".ranks7",".box7");
    readyGame();
}
function removeBg(suits,ranks,bg){
    let delSuits = document.querySelector(suits);
    delSuits.style.backgroundImage = "none";
    let delRanks = document.querySelector(ranks)
    delRanks.textContent = ""
    let delBG = document.querySelector(bg);
    delBG.style.backgroundImage = "url('https://st2.depositphotos.com/4493721/10792/v/950/depositphotos_107929170-stock-illustration-poker-pattern-vector-seamless-casino.jpg')"
}

function runGame(){
    let winValue = document.querySelector(".box10");
    callContinue += 1;
    if (callContinue == 1){
        startGame();
    }else if (callContinue == 2){
        pickCard(".suits1",".ranks1",".box1");
        deckCard.push(pickCard(".suits1",".ranks1",".box1").num);
        pickCard(".suits2",".ranks2",".box2");
        deckCard.push(pickCard(".suits2",".ranks2",".box2").num);
        pickCard(".suits3",".ranks3",".box3");
        deckCard.push(pickCard(".suits3",".ranks3",".box3").num);
        winValue.textContent = checkCard(deckCard);
        deckCard.sort(function(a, b){
            return a - b;
          });
    }else if (callContinue == 3){
        pickCard(".suits4",".ranks4",".box4");
        deckCard.push(pickCard(".suits4",".ranks4",".box4").num);
        winValue.textContent = checkCard(deckCard);
    }else if (callContinue == 4){
        pickCard(".suits5",".ranks5",".box5");
        deckCard.push(pickCard(".suits5",".ranks5",".box5").num);
        winValue.textContent = checkCard(deckCard);
        console.log(deckCard)
    }
}

function checkCard(deckCard){
    if (checkStraight(deckCard) == "straightA"){
        if (checkFlush(deckCard) == 30){
            return 1250;
        }else return 15;
    }else if(checkStraight(deckCard) == "straightNorm"){
        if (checkFlush(deckCard) == 30){
            return 250;
        }else return 15;
    }else if (checkFlush(deckCard) == 30){
        return 30;
    }
    else{
        return checkDuplicate(deckCard);
    }
}

function checkStraight(arr){
    let newArr = []
    for (let i=0;i<arr.length;i++){
        newArr.push(arr[i]%100);
    }
    newArr.sort(function(a,b){
        return a - b;
    });
    let count = 0;
    let checkA = true;
    for (let i=0;i<(arr.length);i++){
        if (newArr[i+1]-newArr[i] == 1){
            count++;
        }
        else if (newArr[i+1]-newArr[i]==0)
            continue
        else if (count > 3){
            return "straightNorm";
            break;
        } else if ((count == 3) && (newArr[0] == 2) && (newArr[arr.length-1] == 13)){
            let checkNum = 3;
            for (let j=1;i<(arr.length-1);j++){
                if (newArr[j]==checkNum){
                    checkNum++;
                }
                else if (checkNum == 6){
                    return "straightA";
                    break;
                }
            }
        }
        else count = 0;
    }
}

function checkFlush(arr){
    let newArr = []
    for (let i=0;i<arr.length;i++){
        newArr.push(Math.round(arr[i]/100));
    }
    newArr.sort(function(a,b){
        return a - b;
    });
    let count = 0;
    for (let i=0;i<(arr.length);i++){
        if (newArr[i+1]==newArr[i]){
            count++;
        }
        else if (count > 3){
            return 30;
            break;
        }else count = 0;
    }
}

function checkDuplicate(arr){
    let newArr = []
    for (let i=0;i<arr.length;i++){
        newArr.push(arr[i]%100);
    }
    newArr.sort(function(a,b){
        return a - b;
    });
    let pair = 0, threeOfAKind = 0, fourOfAKind = 0, countPair = 0, have3OfAKind = 0;
    for (let i=0;i<(arr.length);i++){
        if (newArr[i+1] == newArr[i]){
            if (pair == 1){
                if (threeOfAKind == 1){
                    fourOfAKind = 1;
                    countPair = 0;
                    have3OfAKind = 0;
                }else threeOfAKind = 1, have3OfAKind += 1; countPair = 0;
            }else pair = 1, countPair += 1.
        }
        else {
            pair = 0, threeOfAKind = 0;
        }
    }
    if (have3OfAKind == 0 && fourOfAKind == 0 && countPair == 0)
            return 0
        else if(have3OfAKind == 0 && fourOfAKind == 0 && countPair == 1)
            return 2
        else if (have3OfAKind == 0 && fourOfAKind == 0 && countPair > 1)
            return 4
        else if (have3OfAKind == 1 && fourOfAKind == 0 && countPair == 0)
            return 7
        else if ((have3OfAKind == 1 && fourOfAKind == 0 && countPair > 0) || (have3OfAKind > 1))
            return 50
        else if (fourOfAKind == 1)
            return 100
}

function startGame(){
    cardPack = [];
    for (let i=1;i<5;i++){
        for(let j=2;j<14;j++){
            cardPack.push(i*100+j);
        }
    }
    pickCard(".suits6",".ranks6",".box6");
    deckCard.push(pickCard(".suits6",".ranks6",".box6").num);
    pickCard(".suits7",".ranks7",".box7");
    deckCard.push(pickCard(".suits7",".ranks7",".box7").num);
}

function pickCard(suitsDiv, ranksDiv, boxChangeColor){
    let cardRand = Math.floor(Math.random()*cardPack.length);
    let numCard = cardPack[cardRand];
    function getSuitsIcon(numCard){
        let suits = Math.round(numCard/100);
        switch(suits){
            case 1: return "url('https://cdn-icons-png.flaticon.com/512/1232/1232572.png?w=740&t=st=1675753118~exp=1675753718~hmac=db2af4037528ac177617edaa13eca83cea35d14659f3cc9cccaf7e368050ed26')";
            case 2: return "url('https://cdn-icons-png.flaticon.com/512/594/594604.png?w=740&t=st=1675752976~exp=1675753576~hmac=1a0f69aee97761cee325a822eccdafdc9ecdd9bc4bc6d6cdc0728ec6c0391931";
            case 3: return "url('https://cdn-icons-png.flaticon.com/512/250/250748.png?w=740&t=st=1675753212~exp=1675753812~hmac=62c75ac693e386d4c701d4e997c34085b60665bb13971b78e5802aa613e58d28')";
            case 4: return "url('https://cdn-icons-png.flaticon.com/512/1006/1006842.png?w=740&t=st=1675753158~exp=1675753758~hmac=9239a7c9f5739d0ab4858b2c5321a75beaa98ec8b037a101a3d09de78e6a5463')";
        }
    }
    let cardSuits = document.querySelector(suitsDiv);
    cardSuits.style.backgroundImage = getSuitsIcon(numCard);
    function getRanks(numCard){
        let ranks = numCard%100;
        if (ranks<11&& ranks>1){
            return ranks;
        }else{
            switch (ranks){
                case 10: return "J"
                case 11: return "Q"
                case 12: return "K"
                case 13: return "A"
            }
        }
    }
    let cardRanks = document.querySelector(ranksDiv);
    cardRanks.textContent = getRanks(numCard);
    cardPack.splice(cardRand,1);
    let backgrColor = document.querySelector(boxChangeColor)
    backgrColor.style.backgroundImage = "url('https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg')"
    return {
        num: numCard
    };
}


