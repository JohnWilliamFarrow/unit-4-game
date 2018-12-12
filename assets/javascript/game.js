//Document Ready
$(document).ready(function () {

//Initialize Global Variables
var charList = [];
var playerChar = [];
var enemyChar = [];

//Starts game resetting all values, attributes, positons, etc
initializeGame();

//PlayerSelect Listener
    $("div.character").on("click", function () {
        //Check if a Player is already selected, if not run code

        var isPlayer = checkForPlayer();
        if (isPlayer != true) {

            //Listen for a click, set isPlayer to true
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
                    $(enemyId).addClass( "enemy" );
                }
            }
            //enemySelect()
            enemySelect();
        }
        else {

        }
    });

//EnemySelect()
function enemySelect(){
    //Please Select An Enemy
    $("#instructions").text("Please Select an Enemy!");
    //Listen for Click, set isFight to true, cannot select Dead Enemy
    $("div.enemy").on("click", function () {
        //Listen for a click, set isFight to true
        var enemySelection = $(this).attr("value");
        enemyChar = searchChar(enemySelection, charList);
        changeValue(enemyChar.name, "isFight", true);

        console.log(enemyChar.isFight);  
        //Change to Fight Image
        fightImage(enemyChar.name);

        //Move to Arena
        $(this).detach().prependTo("#enemyChar");

        //Call battleHandler()
        battleHandler();
        
    });
};


//battleHandler()
function battleHandler(){

    $("#fight").show();
    $("#instructions").text("Time to D-D-D-DUEL!");
    $("#fight").text("Attack");

    $("#fight").on("click", function () {
        //player attack

        //counter attack
    });

};
    //Display Attack Btn
    //Listen for Attack Btn Click
    //Attack()

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

    //Check if there is a Player Character
    function checkForPlayer(){
        for (var i = 0; i < charList.length; i++) {
            if (charList[i].isEnemy == false) {
                return true;
            }
        }
    };


    //Sets Game to Initial State
    function initializeGame() {
        //Hide Attack Button
        $("#fight").hide();
        //Reset all characters
        charList = [
            vader = {
                name: "vader",
                hp: 100,
                hpMax: 100,
                atk: 7,
                atkBase: 7,
                ctnAtk: 10,
                isEnemy: true,
                isDead: false
            },
            han = {
                name: "han",
                hp: 120,
                hpMax: 120,
                atk: 5,
                atkBase: 5,
                ctnAtk: 10,
                isEnemy: true,
                isDead: false
            },
            obiWan = {
                name: "obiWan",
                hp: 110,
                hpMax: 110,
                atk: 6,
                atkBase: 6,
                ctnAtk: 10,
                isEnemy: true,
                isDead: false
            },
            luke = {
                name: "luke",
                hp: 90,
                hpMax: 90,
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
