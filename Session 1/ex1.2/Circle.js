import Point from "./Point.js";
const Circle = function (center, radius){
    this.center = center;
    this.radius = radius;
}
Circle.prototype.getCenter = function(){
    return this.center;
}
Circle.prototype.radius = function(){
    return this.radius;
}
Circle.prototype.moveTo = function(x,y){
    this.getCenter = this.center.moveTo(x,y);
}
Circle.prototype.toString = function () {
    return (
      "center is at: " +
      this.center.toString() +
      " with a radius of: " +
      this.radius
    );
  };

  export default Circle;