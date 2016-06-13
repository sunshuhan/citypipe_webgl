/*子过程的类，定义了逻辑关系，时间关系，位置关系以及子过程包含的物体数组pipeobj[]
*/
function Subprocess(name,log,time,px,py,pz){
	this.name=name;
	this.logic = log;
	this.time = time;
	this.position_x = px;
	this.position_y = py;
	this.position_z = pz;
	this.pipeobj = [];	
	this.isadd=0;
}
Subprocess.prototype.addobj=function(obj)
{
	this.pipeobj.push(obj);
}

Subprocess.prototype.render=function(t)
{
	t = t||0;
	//逻辑关系
	if(this.logic ==1)
	{
		//时间关系
		if(eval(this.time)==true)
		{
			var l = this.pipeobj.length;
			//位置关系
			px=this.position_x ;
			py=this.position_y ;
			pz=this.position_z;
			//如子过程未添加
			if(this.isadd==0)
			{
				for(var i=0;i<l;i++)
				{
					this.pipeobj[i].render(px,py,pz,t);
				}
				this.isadd=1;
			}
			//如子过程已添加，更新子过程下所有物体
			else 
			{
				for(var i=0;i<l;i++)
				this.pipeobj[i].refresh(t,px,py,pz);
			}
		}
	}
	//如果t变化后，不满足时间关系的条件，移除该子过程下的所有物体
	if(eval(this.time)!=true || t=="remove")
	{
			var l = this.pipeobj.length;
			for(var i=0;i<l;i++)
			this.pipeobj[i].remove();
	}
}