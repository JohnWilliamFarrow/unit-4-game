//Document Ready
$(document).ready(function () {

//Initialize Global Variables
var charList = [];
var playerChar = [];
var enemyChar = [];
var state = 0;
var deadEnemy = 0;

//Starts game resetting all values, attributes, positons, etc
initializeGame();

//PlayerSelect Listener
    $("div.character").on("click", function () {

        //Check if a Player is already selected, if not run code
        var isPlayer = checkForProperty("isEnemy", false);
        if (isPlayer != true) {

            //Listen for a click, set isEnemy to false
            var playerSelection = $(this).attr("value");
            playerChar = searchChar(playerSelection, charList);
            changeValue(playerChar.name, "isEnemy", false);

            //Move Player to Arena
            $(this).detach().appendTo("#playerChar");
            $(findStatsDiv(playerChar.name)).detach().appendTo("#playerChar");

            //Change to Fight Image
            fightImage(playerChar.name);

            //Move Enemies to Enemy Section
            for (var i = 0; i < charList.length; i++) {
                if (charList[i].isEnemy == true) {
                    var enemyId = document.getElementById(charList[i].name);
                    $(enemyId).detach().appendTo("#enemies");
                    $(findStatsDiv(charList[i].name)).detach().appendTo("#enemies");
                    $(enemyId).addClass( "enemy" );
                }
            }
            //enemySelect()
            enemySelect();
        }
    });

    //EnemySelect()
    function enemySelect() {
        //Please Select An Enemy
        $("#fight").hide();
        $("#instructions").text("Please Select an Enemy!");
            //Listen for Click, set isFight to true, cannot select Dead Enemy, only runs
            //if there is no one currently fighting
            $("div.enemy").on("click", function() {
                if(checkForProperty("isFight",true) != true){
                    //Listen for a click, set isFight to true
                    var enemySelection = $(this).attr("value");
                    enemyChar = searchChar(enemySelection, charList);
                    if (enemyChar.isDead === false) {
                        changeValue(enemyChar.name, "isFight", true);

                        console.log(enemyChar.isFight);
                        //Change to Fight Image
                        fightImage(enemyChar.name);

                        //Move to Arena
                        $(this).detach().prependTo("#enemyChar");
                        $(findStatsDiv(enemyChar.name)).detach().appendTo("#enemyChar");

                        //Call battleHandler(), kept calling this more than once... was causing an error
                        //if(state === 0){
                           // state = 1;
                            battleHandler(enemyChar);
                        //}
                    }
                }
                else if(checkForProperty("isFight",true) === true){
                    alert("Someone is already fighting bro wait your turn")
                }

            });
        
        
        };


//battleHandler()
function battleHandler(){
    //Shows fight button and sets text to Duel
    $("#fight").show();
    $("#instructions").text("Time to D-D-D-DUEL!");
    $("#fight").text("Attack");

    $("#fight").on("click", function () {
        //Deal player attack to enemy hp
        enemyChar.hp = enemyChar.hp - playerChar.atk;

        //Increase player attack by base attack
        playerChar.atk = playerChar.atk + playerChar.atkBase;
        console.log(playerChar.atk);
        
        //Print changes to screen, also had to swap font family back? I'm guessing text resets the css?
        $(findStatsDiv(playerChar.name)).text("HP: " + playerChar.hp + " Atk: " + playerChar.atk);
        $(findStatsDiv(playerChar.name)).css("font-family", 'Determination Sans');
        $(findStatsDiv(enemyChar.name)).text("HP: " + enemyChar.hp + " Atk: " + enemyChar.atk);
        $(findStatsDiv(enemyChar.name)).css("font-family", 'Determination Sans');

        //Determine if Enemy is dead
        if(enemyChar.hp <= 0){
            //Change the enemy to dead, remove them from fighting
            enemyChar.isDead = true;
            console.log(enemyChar.isDead);
            enemyChar.isFight = false;
            console.log(enemyChar.isFight);
            $(findCharDiv(enemyChar.name)).detach().appendTo("#defeated");
            $(findStatsDiv(enemyChar.name)).detach().appendTo("#defeated");
            $(findStatsDiv(enemyChar.name)).text("Defeated");
            $(findStatsDiv(enemyChar.name)).css("font-family", 'Determination Sans');
            deadEnemy++;
            if(deadEnemy === 3){
                gameOver("win");
            }
            else{
                enemySelect();
            }
        }
        //Enemy isn't dead, counter attack
        else{
            //Deal enemy Counter Atk Dmg to Player HP
            playerChar.hp = playerChar.hp - enemyChar.ctnAtk;
            $(findStatsDiv(playerChar.name)).text("HP: " + playerChar.hp + " Atk: " + playerChar.atk);
            $(findStatsDiv(playerChar.name)).css("font-family", 'Determination Sans');

            //Determine if Player is dead
            if(playerChar.hp <= 0){
                gameOver("lose");
            }
        }
    });
};

function gameOver(condition){
    if(condition === "win"){
        alert("You win!");
    }
    if(condition === "lose"){
        alert("You lose!");
    }
}

//Attack()
    //Player Atk Dmg HP Enemy
    //Increase Player Atk by Player Base Attack
    //Check Enemy HP
        //if <= 0
            //KillEnemy
        //else
            //Enemy isFight true, isDead false, ctnAtk dmg Player HP
                //if Player HP <=0
                    //Set isDead to true
                    //GameEnd()
                //else
                    //if (for all Enemy, check isDead = true)
                        //GameEnd()
                    //BattleHandler()


    //Search for Value in Char Array and Change it
    //Takes in Character Name, Property to Change, Value to Change
    //No Return
    function changeValue(name, prop, value) {
        //Search for Character Name
        for (var i in charList) {
            if (charList[i].name == name){
                //Change Property to New Value
                var object = charList[i];
                object[prop] = value;
                break;
            }
        }
    };

    //Search for Character
    //Returns Character Object in charList Array
    function searchChar(playerChoice, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].name == playerChoice) {
                return array[i];
            }
        }
    };

    //Changes Character Image to their "Fighting" form
    function fightImage(name){
        switch(name){
            case "luke" : 
                document.getElementById(name).style.backgroundImage = "url('assets/images/lukeFight.png')";
                break;
            case "vader" : 
                document.getElementById(name).style.backgroundImage = "url('assets/images/vaderFight.png')";
                break;
            case "han" : 
                document.getElementById(name).style.backgroundImage = "url('assets/images/hanFight.png')";
                break;
            case "obiWan" : 
                document.getElementById(name).style.backgroundImage = "url('assets/images/obiFight.png')";
                break;
        }
    }

    //Find the Stats Div for each selected Character
    function findStatsDiv(name){
        switch(name){
            case "luke" : 
                var test = document.getElementById("lukeStats");
                return test;
            case "vader" : 
                return document.getElementById("vaderStats");
            case "han" : 
                return document.getElementById("hanStats");
            case "obiWan" : 
                return document.getElementById("obiWanStats");
        }
    }

    //Find the Stats Div for each selected Character
    function findCharDiv(name){
        switch(name){
            case "luke" : 
                var test = document.getElementById("luke");
                return test;
            case "vader" : 
                return document.getElementById("vader");
            case "han" : 
                return document.getElementById("han");
            case "obiWan" : 
                return document.getElementById("obiWan");
        }
    }

    //checkForProperty(property to check for, value to evaulate)
    function checkForProperty(prop, value){
        for (var i = 0; i < charList.length; i++) {
            var object = charList[i];
            if (object[prop] == value) {
                return true;
            }
        }
        
    }

    //Sets Game to Initial State
    function initializeGame() {
        //Reset Variables
        playerChar = [];
        enemyChar = [];
        state = 0;
        deadEnemy = 0;
        //Hide Attack Button
        $("#fight").hide();
        //Reset all characters
        charList = [
            vader = {
                name: "vader",
                hp: 110,
                hpMax: 110,
                atk: 7,
                atkBase: 7,
                ctnAtk: 10,
                isEnemy: true,
                isDead: false
            },
            han = {
                name: "han",
                hp: 130,
                hpMax: 130,
                atk: 5,
                atkBase: 5,
                ctnAtk: 10,
                isEnemy: true,
                isDead: false
            },
            obiWan = {
                name: "obiWan",
                hp: 120,
                hpMax: 120,
                atk: 6,
                atkBase: 6,
                ctnAtk: 10,
                isEnemy: true,
                isDead: false
            },
            luke = {
                name: "luke",
                hp: 100,
                hpMax: 100,
                atk: 8,
                atkBase: 8,
                ctnAtk: 10,
                isEnemy: true,
                isDead: false
            }
        ];
        //Reset Div Positions
        //Reset Select a Character

    }

})
