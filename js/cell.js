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
	//ячейка как элемент
	this.elem = document.getElementById('cell-'+i+'-'+j);	
}
/////////////////////////////////////////////////
//открываем ячейку
Cell.prototype.cellOpen = function(is_emit=0){	
	this.drawOpen();
	//если мина - то кончина
	if(this.is_mine)
	{		
		this.drawMine();
		this.elem.dispatchEvent(is_lose);
	}
	else //выводим циферки
	if(this.mines_around>0) 	
		this.drawMinesAround();	
	else if(!is_emit) //если ячейка пуста
	{
		this.elem.innerHTML=" ";		
		this.elem.dispatchEvent(open_empty);		
	}
		
};
//эмитируем клик
Cell.prototype.emitClick = function(){	
	if(this.status==0&&!this.is_mine) 
	{		
		this.cellOpen(1);
		this.status = 1;	
	}
}
//реагируем на клик
Cell.prototype.checkClick = function(){	
	if(this.status==0) 
	{		
		this.cellOpen();		
		this.status = 1;
		/*count++;
		//а ведь мы в любой момент можем выиграть!		
		if(count == this.for_win)
		{
			document.getElementById("game_status").className="win";
		}	*/	
	}
}
//при нажатии правой мыши - разбираемся с флагами
Cell.prototype.checkFlag = function(event){		
	var bomb=document.getElementById('bomb_cnt')
	//ставим флаг только, если мины еще не кончились и ячейка закрыта
	if(this.status==0 && bomb.innerHTML>0) 
	{			
		this.status = 2;
		//рисуем флаг		
		this.drawFlag();
		//предположительно одной миной стало меньше
		bomb.innerHTML-=1;
	}
	//убираем флаг с ячейки
	else if(this.status==2) 
	{			
		this.status = 0;
		//убираем флаг
		this.removeFlag();
		//все вернулось на круги своя
		bomb.innerHTML++;
	}	
	//отключам стандартное меню
	event = event || window.event;
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
}
/////////////////////////////////////////////////
/////Изображение состояний ячейки////////////////
/////////////////////////////////////////////////
//прорисовываем закрытую ячейку
Cell.prototype.drawClose = function(){
	this.elem.classList.add("cell_close");
};
//прорисовываем открытую ячейку
Cell.prototype.drawOpen = function(){
	this.elem.classList.remove("cell_close");
};
//прорисовываем ячейку с миной
Cell.prototype.drawMine = function(){
	this.elem.classList.add("cell_mine");
};
//прорисовываем ячейку с флагом
Cell.prototype.drawFlag = function(){
	this.elem.classList.add("cell_flag");
};
//прорисовываем ячейку без флага
Cell.prototype.removeFlag = function(){
	this.elem.classList.remove("cell_flag");
};
//прорисовываем число окружающих мин
Cell.prototype.drawMinesAround = function(){
	this.elem.innerHTML=this.mines_around;
	switch (this.mines_around) {
		case 1:
			this.elem.classList.add("cell_open_one");
			break;
		case 2:
			this.elem.classList.add("cell_open_two");
			break;
		case 3:
			this.elem.classList.add("cell_open_three");
			break;
		default:
			this.elem.classList.add("cell_open_more");
			break;
	}
}
