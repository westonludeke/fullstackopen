const calculateBmi = (weight: number, height: number): string => {
  const bmi = weight / (height ** 2) * 703;

  return bmi < 18.5 ? 'Underweight' :
         bmi < 24.9 ? 'Normal (healthy weight)' :
         bmi < 29.9 ? 'Overweight' :
         'Obesity';
};

const parseArguments = (args: Array<string>): { weight: number, height: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const weight = Number(args[2]);
  const height = Number(args[3]);

  if (isNaN(weight) || isNaN(height)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    weight,
    height
  };
};

try {
  const { weight, height } = parseArguments(process.argv);
  const bmi = calculateBmi(weight, height);
  console.log(bmi);
} catch (e) {
  console.log('Error:', e.message);
}
