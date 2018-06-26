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
			this.field_cells[i][j].for_win=this.field_width*this.field_height-this.mines;
		}
	}
}
//создаем поле
Field.prototype.getField = function(){
	//устанавливаем мины
	this.drawMines(this.mines);
	//проверяем окружение
	this.drawArounds();
}
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
	Field.prototype.drawArounds = function(mines){
		var around=0;		
		for(var i=0; i<this.field_width; i++)
			for(var j=0; j<this.field_height; j++)
			{
				if(this.field_cells[i][j].is_mine) continue;

				if(i>0) if(this.field_cells[i-1][j].is_mine) around++;
				if(j>0) if(this.field_cells[i][j-1].is_mine) around++;
				if(i<(this.field_width-1))if(this.field_cells[i+1][j].is_mine) around++;
				if(j<(this.field_width-1))if(this.field_cells[i][j+1].is_mine) around++;
				///////
				if(i>0&&j>0) if(this.field_cells[i-1][j-1].is_mine) around++;
				if(i>0&&j<(this.field_width-1)) if(this.field_cells[i-1][j+1].is_mine) around++;
				if(j>0&&i<(this.field_width-1)) if(this.field_cells[i+1][j-1].is_mine) around++;
				if(i<(this.field_width-1)>0&&j<(this.field_width-1)) if(this.field_cells[i+1][j+1].is_mine) around++;
				///////
				this.field_cells[i][j].mines_around=around;
				around=0;
			}		
	}
//прорисовываем все ячейки
Field.prototype.drawCells = function(){
	var cells_view="";

	
	for(var i=0; i<this.field_width; i++)
	{
		cells_view+="<div class='cell_row'>";
		for(var j=0; j<this.field_height; j++)
		{
			cells_view+=this.field_cells[i][j].drawClose();			
		}
		cells_view+="</div>";
	}

	return cells_view;
};
//реагируем на клик
Field.prototype.cellClick = function(){
	for(var i=0; i<this.field_width; i++)
		for(var j=0; j<this.field_height; j++)
		{			
			var cell=document.getElementById('cell-'+i+'-'+j);
			var context=this.field_cells[i][j];
			cell.addEventListener('click',context.checkClick.bind(context));
			cell.addEventListener('contextmenu',context.checkFlag.bind(context));			
		}
}