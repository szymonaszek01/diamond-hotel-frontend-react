const Steps = ({ steps, count, error, width, validationOff }) => {
  const getLineStyle = (step) => {
    let color = '';
    if (count === step) {
      if (validationOff) {
        color = 'border-[#d0bf79]';
      } else {
        color = error ? 'border-red-600' : 'border-green-500';
      }
    }

    return `border-2 ${color}`;
  };

  return (
    <div className="flex flex-row justify-center sm:justify-start items-center gap-5 w-full mt-7">
      {Array.from({ length: steps }, (_, index) => index + 1).map((step, index) => (
        <hr key={`step-${index + 1}`} className={`${getLineStyle(step)} ${width ?? 'w-full'}`} />
      ))}
    </div>
  );
};

export default Steps;
