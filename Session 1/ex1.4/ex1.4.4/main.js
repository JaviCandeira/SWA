const Factorial = (x) => {
    let fact = 1;
    for (i = 1; i < x+1; i++) {
      fact *= i;
    }
    return fact;
  };
  
  console.log(Factorial(1)); // 1
  console.log(Factorial(2)); // 2
  console.log(Factorial(3)); // 6
  console.log(Factorial(4)); // 24
  
  console.log(Factorial(10)); // 3628800
  
  const Power = (m, n) => {
    let pow = 1;
    for (let i = 0; i < n; i++) {
      pow *= m;
    }
    return pow;
  };
  
  console.log(Power(1, 2)); // 1
  console.log(Power(2, 2)); // 4
  console.log(Power(3, 2));  // 9 
  console.log(Power(4, 2)); // 16
  console.log(Power(3, 2)); // 9
  console.log(Power(-3, 2));  // 9