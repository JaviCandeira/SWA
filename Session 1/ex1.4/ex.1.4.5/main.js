const AdvancedFunction = (...args) => {
    if (args.length < 1) {
      return "No args provided";
    }
  
    if (args.length === 1) {
      let fact = 1;
      for (i = 1; i < args[0]+1; i++) {
        fact *= i;
      }
      return fact;
    }
  
    if (args.length === 2) {
      let pow = 1;
      for (let i = 0; i < args[1]; i++) {
        pow *= args[0];
      }
      return pow;
    }
  
    if (args.length > 2) {
      return "Too many args";
    }
  };
  
  console.log(AdvancedFunction()); // No args provided
  console.log(AdvancedFunction(1, 2, 3)); // Too many args
  
  console.log(AdvancedFunction(1)); // 1
  console.log(AdvancedFunction(2)); // 2
  console.log(AdvancedFunction(3)); // 6
  
  console.log(AdvancedFunction(2,1)); // 2
  console.log(AdvancedFunction(2,2)); // 4
  console.log(AdvancedFunction(2,3)); // 8
  
  console.log(AdvancedFunction(3,3)); // 27