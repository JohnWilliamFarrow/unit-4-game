//Document Ready
$(document).ready(function () {

//Object with all character data
//name hp atk atkBase ctnAtk isPC isEnemy isFight isDead
//DarthVader HanSolo LukeSkywalker ObiWanKenobi

var charList = [
    vader = { 
        name : "vader",
        hp : 100,
        hpMax : 100,
        atk : 6,
        atkBase : 6,
        ctnAtk : 10,
        isPlayer : false,
        isEnemy : false,
        isDead : false
      },
      han = { 
        name : "han",
        hp : 120,
        hpMax : 120,
        atk : 6,
        atkBase : 6,
        ctnAtk : 10,
        isPlayer : false,
        isEnemy : false,
        isDead : false
      },
      obiWan = { 
        name : "obiWan",
        hp : 110,
        hpMax : 110,
        atk : 6,
        atkBase : 6,
        ctnAtk : 10,
        isPlayer : false,
        isEnemy : false,
        isDead : false
      },
      luke = { 
        name : "luke",
        hp : 90,
        hpMax : 90,
        atk : 6,
        atkBase : 6,
        ctnAtk : 10,
        isPlayer : false,
        isEnemy : false,
        isDead : false
      }
    ];

//Game Initialize
//Please Select A Character

//PlayerSelect Listener
$("div.character").on("click", function () {

    //Listen for a click, set isPlayer to true
    var playerSelection = $(this).attr("value");

    var playerChar = search(playerSelection,charList);
    
    function search(playerSelection, charList){
        for (var i=0; i < charList.length; i++) {
            if (charList[i].name === playerSelection) {
                return charList[i];
            }
        }
    }

    console.log(playerChar);
    $(this).detach().prependTo("#playerChar");
    
    
    //move to Arena
    //move enemies to other side of page
    //EnemySelect()
});

//EnemySelect()
    //Hide Attack button
    //Please Select An Enemy
    //Listen for Click, set isFight to true, cannot select Dead Enemy
    //Move to Arena
    //Battle()

//BattleHandler()
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

})
