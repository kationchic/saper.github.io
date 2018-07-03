var Game= function(size){
	this.size=size;
	document.getElementById("field").innerHTML=this.drawCells();
	this.field = new Field(size);	
}
//создаем ячейки
Game.prototype.drawCells = function(){
	var cells_view="";

	for(var i=0; i<this.size; i++)
	{
		cells_view+="<div class='cell_row'>";		
		for(var j=0; j<this.size; j++)
		{
			cells_view+="<div id='cell-"+i+"-"+j+"' class='cell cell_close'></div>";
		}
		cells_view+="</div>";
	}
	return cells_view;
};
//инициализация
Game.prototype.getField= function(){
	this.field.getField();
	this.field.cellClick();	
}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
function newGame(){	
	var cnt=10;
	var game = new Game(cnt);	

	//создание поля
	game.getField();
	
	//прорисовка поля
	document.getElementById("game_status").className="ok";
	document.getElementById("saper").style.width=(60+cnt*20)+"px";	
	document.getElementById("bomb_cnt").innerHTML=cnt;
}

var restart=document.getElementById("restart_btn");
restart.addEventListener('click',newGame);

newGame();
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////