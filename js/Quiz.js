class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background(255,255,0);

    //write code to show a heading for showing the result of Quiz
    var heading = createElement('h2',"Result of the Quiz");
    heading.position(350,0);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      push();
      fill(0,0,255);
      textSize(20);
      text("**NOTE : Contestant who answered correctly are highlighted in green color.",100,400);
      pop();
    }

    //write code to add a note here

    //write code to highlight contest who answered correctly
    for(var player in allContestants){
      var correctAnswer = "2";
      if(correctAnswer === allContestants[player].answer){
        fill(0,255,0);
      }else{
        fill(255,100,0);
      }
      var a = player.split('');
      textSize(20);
      text(allContestants[player].name,100,0+20*a[a.length-1]);
    }
    
  }

}
