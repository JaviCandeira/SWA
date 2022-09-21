import Circle from "./Circle.js";
import Point from "./Point.js";

let Point1 = Point(1, 2);
let Point2 = Point(3, 4);
let Point3 = Point(5, 6);

let Circle1 = Circle(Point1, 7);
let Circle2 = Circle(Point2, 8);
let Circle3 = Circle(Point3, 9);

let circles = [Circle1, Circle2, Circle3];
let radiuses = circles.map((x) => x.getRadius());

console.log(radiuses);
console.log(circles.map((x) => x.getRadius()))