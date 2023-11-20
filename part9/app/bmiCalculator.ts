const calculateBmi = (weight: number, height: number) : string => {
  const bmi = weight / (height ** 2) * 703;

  return bmi < 18.5 ? 'Underweight' :
         bmi < 24.9 ? 'Normal (healthy weight)' :
         bmi < 29.9 ? 'Overweight' :
         'Obesity';
}

console.log(calculateBmi(180, 74)) // Normal (healthy weight) // 23.1
console.log(calculateBmi(218, 67)) // 
console.log(calculateBmi(209, 67)) // 
console.log(calculateBmi(180, 67)) // 