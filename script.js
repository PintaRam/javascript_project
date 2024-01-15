let userScore = 0 ;
let CompScore = 0;


const choices = document.querySelectorAll(".choice");
const msg  = document.querySelector("#msg");
 const userSre = document.querySelector("#user-id");
 const compSre = document.querySelector("#comp-id");
const genComGenerate=()=>
{
    const Option = ["scissor" , "paper","rock"];
    const randIdx = Math.floor(Math.random()*3);
    return Option[randIdx];

}

const draw = ()=>
{
    console.log("Draw game")
    msg.innerText = "Game was Draw";
    msg.style.backgroundColor = "grey";
}

const showWinner = (userWin , userChoice, compChoice)=>
{
    if(userWin)
    {   userScore++;
        console.log("You win");
        msg.innerText = `You Won! Your ${userChoice} beats ${compChoice}`;
        userSre.innerText = userScore;
        msg.style.backgroundColor = "green";

    }
    else{
        CompScore++;
        msg.innerText = `You Lost! ${compChoice} beats  Your ${userChoice}`;
        console.log("You Lost");
        compSre.innerText = CompScore;
        msg.style.backgroundColor = "red";
    }
}

const playGame=(userChoice)=>
{ console.log("User Choice is ",userChoice);
  const compChoice = genComGenerate();
  console.log("Computer choice",compChoice);
  if(userChoice === compChoice)
  {
    //draw 
    draw();
    
  }else{
    let userWin = true;
    if(userChoice === "rock")
    {   
        //computer choice can be paper or scissor
        userWin = compChoice === "scissor"?true:false;
    }
    else if(userChoice === "paper")
    {
        //computer choices can be scissor  or rock
        userWin = compChoice === "rock"?true:false;
    }
    else
    {
        //userchoice is scissor
        //computer choice can be paper or rock
        userWin = compChoice === "paper"?true:false;
    }
    showWinner(userWin , userChoice , compChoice);
  }

}

choices.forEach((choice)=>{
  choice.addEventListener("click",()=>
  {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
