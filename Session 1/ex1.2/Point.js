const Point = function (x,y){
    this.x = x;
    this.y = y;
}
Point.prototype.x = function(){
    return this.x;
}
Point.prototype.y = function(){
    return this.y;
}
Point.prototype.moveTo = function(x,y){
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function(){
    return "(" + this.x + "," + this.y + ")";
}
Point.prototype.copy = function(){
    return this
}

export default Point;