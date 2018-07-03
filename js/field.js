var Field= function(size){
	this.field_width=size;
	this.field_height=size;
	this.mines= size;
	this.field_cells=new Array();
	//создаем корпоратив ячеек
	for(var i=0; i<this.field_width; i++)
	{
		this.field_cells[i] = new Array();
		for(var j=0; j<this.field_height; j++)
		{
			this.field_cells[i][j]=new Cell(i,j);			
		}
	}	
	addEventListener("lose", this.GameOver.bind(this));
	addEventListener("open_empty", this.EmptyCell.bind(this));
}
//открываем ячейки автоматически
Field.prototype.openCells = function (i,j){
	i*=1; j*=1;	
	if(i>0){
		this.field_cells[i-1][j].emitClick();
		if(this.field_cells[i-1][j].mines_around==0) 
			if((i-1)>0)this.openCells(i-2,j);
	}
	if(j>0){
		this.field_cells[i][j-1].emitClick();
		if(this.field_cells[i][j-1].mines_around==0) 
			if((j-1)>0)this.openCells(i,j-2);
	}	
	if(j<(this.field_width-1)){
		this.field_cells[i][j+1].emitClick();		
	}
	if(i<(this.field_height-1)){
		this.field_cells[i+1][j].emitClick();
		//if(this.field_cells[i+1][j].mines_around==0) this.openCells(i+1,j);
	}
	///////
	if(i>0&&j>0){
		this.field_cells[i-1][j-1].emitClick();
		if(this.field_cells[i-1][j-1].mines_around==0) 
			if((i-1)>0&&(j-1)>0)this.openCells(i-2,j-2);
	}
	if(i>0&&j<(this.field_height-1)){
		this.field_cells[i-1][j+1].emitClick();
		//if(this.field_cells[i-1][j+1].mines_around==0) this.openCells(i-1,j+1);
	}
	if(j>0&&i<(this.field_width-1)){
		this.field_cells[i+1][j-1].emitClick();
		//if(this.field_cells[i+1][j-1].mines_around==0) this.openCells(i+1,j-1);
	}
	if(i<(this.field_width-1)>0&&j<(this.field_height-1)) this.field_cells[i+1][j+1].emitClick();
}
//мы-таки подорвались
Field.prototype.GameOver = function(){	
	document.getElementById("game_status").className="lose";	
	//this.endAction();	
	console.log("Сожалею, вы подорвались");
}
//если ячейка пустая
Field.prototype.EmptyCell = function(event){
	var el_div=event.target['id'];
	var el_ar= el_div.split("-");
	//открываем все непотребство	
	this.openCells(el_ar[1],el_ar[2]);	
}
//создаем поле
Field.prototype.getField = function(){
	//устанавливаем мины
	this.drawMines(this.mines);
	//проверяем окружение
	this.drawArounds();	
}
//расставляем мины
Field.prototype.drawMines = function(mines){
	var m=mines;
	for(var i=0; i<this.field_width; i++)
		for(var j=0; j<this.field_height; j++)
		{
			//мины кончились
			if(m==0) continue;
			//если здесь мины нет и в кармане они еще не кончились
			if(!this.field_cells[i][j].is_mine)
			{
				//если звезды сошлись
				var rnd=Math.floor(Math.random() * 10)+5;					
				if(rnd==5)
				{
					this.field_cells[i][j].is_mine=1;
					this.field_cells[i][j].mines_around="X";
					m--;						
				}
			}
		}
	//прошли все поле, а мины остались		
	if(m>0) this.drawMines(m);	
};
//считаем мины в окружении
Field.prototype.drawArounds = function(mines){
	var around=0;		
	for(var i=0; i<this.field_width; i++)
		for(var j=0; j<this.field_height; j++)
		{
			if(this.field_cells[i][j].is_mine) continue;

			if(i>0) if(this.field_cells[i-1][j].is_mine) around++;
			if(j>0) if(this.field_cells[i][j-1].is_mine) around++;
			if(i<(this.field_width-1))if(this.field_cells[i+1][j].is_mine) around++;
			if(j<(this.field_height-1))if(this.field_cells[i][j+1].is_mine) around++;
			///////
			if(i>0&&j>0) if(this.field_cells[i-1][j-1].is_mine) around++;
			if(i>0&&j<(this.field_height-1)) if(this.field_cells[i-1][j+1].is_mine) around++;
			if(j>0&&i<(this.field_width-1)) if(this.field_cells[i+1][j-1].is_mine) around++;
			if(i<(this.field_width-1)>0&&j<(this.field_height-1)) if(this.field_cells[i+1][j+1].is_mine) around++;
			///////
			this.field_cells[i][j].mines_around=around;
			around=0;
		}	
		//console.log(this.field_cells)	
}
//реагируем на клик
Field.prototype.cellClick = function(){
	for(var i=0; i<this.field_width; i++)
		for(var j=0; j<this.field_height; j++)
		{			
			var context=this.field_cells[i][j];
			this.field_cells[i][j].elem.addEventListener('click',context.checkClick.bind(context));
			this.field_cells[i][j].elem.addEventListener('contextmenu',context.checkFlag.bind(context));			
		}		
}
//убираем слушателя
Field.prototype.endAction = function(){
	for(var i=0; i<this.field_width; i++)
		for(var j=0; j<this.field_height; j++)
		{			
			var context=this.field_cells[i][j];
			this.field_cells[i][j].elem.removeEventListener('click',context.checkClick.bind(context));
			this.field_cells[i][j].elem.removeEventListener('contextmenu',context.checkFlag.bind(context));			
		}
}
