const Steps = ({steps, count, error}) => {
  const getLineStyle = (step) => {
    let color = ''
    if (error) {
      color = 'border-red-600'
    } else if (count === step) {
      color = 'border-green-500'
    }

    return `border-2 ${color}`
  }

  return (
    <div className="flex flex-row justify-center sm:justify-start items-center gap-5 w-full">
      {Array.from({length: steps}, (_, i) => i + 1).map(
        step => <hr className={getLineStyle(step)}/>)}
    </div>
  )
}

export default Steps