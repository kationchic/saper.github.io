function newGame(){
	var cnt=10;
	var field = new Field(cnt);

	//создание поля
	field.getField();	
	//прорисовка поля
	document.getElementById("game_status").className="ok";
	document.getElementById("saper").style.width=(60+cnt*20)+"px";
	document.getElementById("field").innerHTML=field.drawCells();
	document.getElementById("bomb_cnt").innerHTML=cnt;
	
	field.cellClick();
}

var game=document.getElementById("restart_btn");
game.addEventListener('click',newGame);

newGame();