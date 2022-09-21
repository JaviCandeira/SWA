import Circle from "./Circle.js";
import Point from "./Point.js";

let point = new Point(1,2);
console.log(point.toString());

let pointOriginal = point.copy();
console.log(pointOriginal.toString());

point.moveTo(3,4);
console.log(point.toString());

let circle = new Circle(point,5);
console.log(circle.toString());

circle.moveTo(1,2);
console.log(circle.toString());