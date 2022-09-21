import Circle from "./Circle.js";
import Point from "./Point.js"

let Point1 = Point(1, 2);
console.log(Point1.toString());
let pointOriginal = Point1.copy();
console.log(pointOriginal.toString());

Point1.moveTo(3, 4);
console.log(Point1.toString());

let circle1 = Circle(Point1, 5);
console.log(circle1.toString());

circle1.moveTo(1, 2);
console.log(circle1.toString());