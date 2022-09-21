import Point from "./Point.js";
const Circle = (center, radius, x = null, y = null) => {
    const circle = {};
    if(center){
        circle.center = center;
        circle.radius = radius;
    }
    else{
        circle.center = Point(x, y);
        circle.radius = radius;
    }
    circle.getCenter = () => circle.center;
    circle.getRadius = () => circle.radius;
    circle.moveTo = (x, y) => circle.center.moveTo(x, y);
    circle.toString = () => "center is: " + circle.center.toString() + ", radius is: " + circle.radius;
    return circle;
};
export default Circle;