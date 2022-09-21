import Circle from "./Circle.js";
import Point from "./Point.js";

let circle1 = Circle(null, 5,1,2);
console.log(circle1.toString());

let point1 = Point(3, 4);
let circle2 = Circle(point1, 5);
console.log(circle2.toString());