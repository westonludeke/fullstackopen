type CoursePart = {
  name: string;
  exerciseCount: number;
};

type ContentProps = {
  courseParts: CoursePart[];
};

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;