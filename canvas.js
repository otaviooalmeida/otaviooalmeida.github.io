var canvas = document.querySelector('canvas')
    ;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 150;
var pxLimit = 100;

var colorArray = [
    '#ffaa33',
    '#99ffaaa',
    '#00ff00',
    '#4411aa',
    '#ff1100'
]


addEventListener('mousemove',
     function(event) {
        mouse.x = event.x
        mouse.y = event.y
})

addEventListener('resize', 
    function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }
);


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        };
        if (this.y + this.radius > innerHeight ||  this.y - this.radius < 0) {
            this.dy = -this.dy;
        };
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < pxLimit && mouse.x - this.x > -pxLimit
            && mouse.y - this.y < pxLimit && mouse.y - this.y > -pxLimit && this.radius < maxRadius
        ) {
            this.radius += 1;

        } else if (this.radius > this.minRadius) {
            this.radius -= 1;

        };
        this.draw();
    };
};

var circleArray = [];

function init() {
    circleArray = [];

    for (var i = 0; i < 1000; i++) {
        var radius = Math.random() * 5 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = Math.random() * 3;
        var dy = Math.random() * 3;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    };
};    


function Rectangle(x, y, dx, dy, b, h) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.b = b;
    this.h = h;
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    this.drawr = function() {
        c.beginPath();
        c.strokeStyle = this.color;
        c.rect(this.x, this.y, this.b, this.h); 
        c.stroke();
    };

    this.updater = function() {
        if (this.x < 0 || this.x + this.b > innerWidth) {  
            this.dx = -this.dx;
        };
        if (this.y < 0 || this.y + this.h > innerHeight) {  
            this.dy = -this.dy;
        };
        this.x += this.dx;
        this.y += this.dy;

        this.drawr();
    };
};

var rectArray = [];

for (i = 0; i < 50; i++) {
    var x = Math.random() * innerWidth;
    var y = Math.random() * innerHeight;
    var dx = (Math.random() - 0.5) * 5;  
    var dy = (Math.random() - 0.5) * 5;  
    var b = 50;
    var h = 30;
    rectArray.push(new Rectangle(x, y, dx, dy, b, h));
};


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    };
};
animate();
init();
