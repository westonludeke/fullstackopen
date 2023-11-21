interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great job, you reached your target!';
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'You need to exercise more to reach your target';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: Array<string>): { target: number, dailyHours: number[] } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(arg => Number(arg));

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    target,
    dailyHours
  };
};

try {
  const { target, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  console.log('Error:', e.message);
}



