const Steps = ({steps, count, error}) => {
  const getLineStyle = (step) => {
    let color = ''
    if (count === step) {
      color = error ? 'border-red-600' : 'border-green-500'
    }

    return `border-2 ${color}`
  }

  return (
    <div className="flex flex-row justify-center sm:justify-start items-center gap-5 w-full mt-7">
      {Array.from({length: steps}, (_, index) => index + 1).map(
        (step,index) => <hr key={`step-${index+1}`} className={`${getLineStyle(step)} w-full`}/>)}
    </div>
  )
}

export default Steps