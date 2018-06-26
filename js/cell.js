//сколько открыто ячеек
count=0;

var Cell = function(i,j) {
	//социальный статус ячейки
	this.status=0; //0-close; 1- open; 2-flag
	//здесь ли мина
	this.is_mine=0; 
	//и сколько мин вокруг
	this.mines_around=0;	
	//наше место в этой вселенной
	this.c_i=i;
	this.c_j=j
	//условия выигрыша
	this.for_win=0;
}

//прорисовываем закрытую ячейку
Cell.prototype.drawClose = function(){
	return "<div id='cell-"+this.c_i+"-"+this.c_j+"' class='cell cell_close'></div>";
};
//открываем ячейку
Cell.prototype.drowOpen = function(){			
	var cell=document.getElementById('cell-'+this.c_i+'-'+this.c_j);
	cell.classList.remove('cell_close');
	//если мина - то кончина
	if(this.is_mine)
	{
		cell.classList.add("cell_mine");
		document.getElementById("game_status").className="lose";		
		console.log("Сожалею, вы подорвались");
	}
	//выводим циферки
	if(this.mines_around>0) 
	{
		cell.innerHTML=this.mines_around;
		switch (this.mines_around) {
			case 1:
				cell.classList.add("cell_open_one");
				break;
			case 2:
				cell.classList.add("cell_open_two");
				break;
			case 3:
				cell.classList.add("cell_open_three");
				break;
			default:
				cell.classList.add("cell_open_more");
				break;
		}
	}
	else cell.innerHTML=" ";
		
};
//реагируем на клик
Cell.prototype.checkClick = function(){	
	if(this.status==0) 
	{		
		this.drowOpen();		
		this.status = 1;
		count++;
		//а ведь мы в любой момент можем выиграть!
		console.log(count+"---"+this.for_win);
		if(count == this.for_win)
		{
			document.getElementById("game_status").className="win";
		}		
	}
}
//при нажатии правой мыши - разбираемся с флагами
Cell.prototype.checkFlag = function(event){	
	var cell=document.getElementById('cell-'+this.c_i+'-'+this.c_j);
	var bomb=document.getElementById('bomb_cnt')
	//ставим флаг только, если мины еще не кончились и ячейка закрыта
	if(this.status==0 && bomb.innerHTML>0) 
	{			
		this.status = 2;
		//рисуем флаг		
		cell.classList.add('cell_flag');
		//предположительно одной миной стало меньше
		bomb.innerHTML-=1;
	}
	//убираем флаг с ячейки
	else if(this.status==2) 
	{			
		this.status = 0;
		//убираем флаг
		cell.classList.remove('cell_flag');	
		//все вернулось на круги своя
		bomb.innerHTML++;
	}	
	//return false;
	event = event || window.event;
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
}