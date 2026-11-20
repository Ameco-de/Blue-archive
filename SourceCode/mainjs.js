const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));



HTMLElement.prototype.AddPosition = function(x,y){
	this.posx = (this.posx || 0) + x;
	this.posy = (this.posy || 0) + y;
	this.style.transform = `translate(${this.posx}px,${this.posy}px)`;
}


function Collides (a,b)
{
	
	if (a===b){return null;}
	const obj1 = a.getBoundingClientRect();
	const obj2 = b.getBoundingClientRect();
	const Overlapped = obj1.left < obj2.right && obj1.right > obj2.left && obj1.top < obj2.bottom && obj1.bottom > obj2.top;
	if (Overlapped != true) {return null;}
	const overlapLeft = obj1.right - obj2.left;  
	const overlapRight = obj2.right - obj1.left;  
	const overlapTop = obj1.bottom - obj2.top;   
	const overlapBottom = obj2.bottom - obj1.top; 

	const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

	if (minOverlap === overlapLeft) return "left";
	if (minOverlap === overlapRight) return "right";
	if (minOverlap === overlapTop) return "above";
	if (minOverlap === overlapBottom) return "below";

}


function GenerateChibi() {
	const Assets = [ 'Koharu','Azusa','Kirino','Neru','Natsu','Mari','Serika','Akane'
	];
	const chibi = document.createElement('img');
	const rand = Math.floor(Math.random() * Assets.length)
	chibi.src = `../Assets/chibis/${Assets[rand]}.png`;
	chibi.className = "chibi";
	new Audio(`../Assets/chibi sounds/${Assets[rand]}.ogg`).play();
	const w = 100;
	const h = 100;
	const vx = 0;
	const vy = 0;
	const maxw = window.innerWidth;
	const maxh = window.innerHeight;
	const randomX = Math.floor(Math.random() * (maxw - 400) + 200);
	const randomY = Math.floor(Math.random() * (maxh - 400) + 200);
	chibi.style.left = `${randomX}px`;
	chibi.style.top = `${randomY}px`;
	document.body.appendChild(chibi);
	chibi.vx = Math.floor(Math.random()*30) - 15;
	chibi.vy = Math.floor(Math.random()*30) - 15;

	const fall =  setInterval(() => {
		chibi.AddPosition(chibi.vx,chibi.vy);
		const borderY = window.innerHeight;
		const borderX = window.innerWidth;
		const cur = chibi.getBoundingClientRect();
		if (cur.top >= borderY-100){chibi.AddPosition(0,-5);chibi.vy *= -1; }
		if (cur.top <= 0){chibi.AddPosition(0,5); chibi.vy *= -1}
		if (cur.left >= borderX-100){chibi.AddPosition(-5,0);chibi.vx *= -1; }
		if (cur.left <= 0){chibi.AddPosition(5,0); chibi.vx *= -1}
		const otherobj = document.querySelectorAll(".chibi")
		let i = 0;
		let k = 0;
		for (const other of otherobj)
		{
			if (Collides(chibi,other) === "left"){chibi.AddPosition(-5,0);chibi.vx*= -1;break;}
			if (Collides(chibi,other) === "right"){chibi.AddPosition(5,0);chibi.vx*= -1;break; }
			if (Collides(chibi,other) === "above"){chibi.AddPosition(0,-5); chibi.vy*= -1;break;}
			if (Collides(chibi,other) === "below"){chibi.AddPosition(0,5); chibi.vy*= -1;break;}
			
		}

	}, 16);

	setTimeout(() => {
		chibi.classList.add("remove");
		chibi.addEventListener("animationend", () => {
			chibi.remove();
		},{once:true});
	}, 10000);

}

const chibi = document.querySelector('img'); 





