import {randomCode} from "../util";

const TableCell = ({value, textColor, fontStyle}) => {
  return (
    <div key={`cell-${randomCode(4)}`} className={`flex flex-col text-center sm:text-start items-center justify-start w-[100px] bg-transparent`}>
      <p className={`text-xs ${textColor ?? 'text-white'} font-poppins ${fontStyle ?? 'font-thin'} break-all`}>{value}</p>
    </div>
  )
}

export default TableCell