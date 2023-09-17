import {minus, plus} from "../assets";

const PlusMinusButton = ({id, name, value, setValue, limit}) => {
  return (
    <div key={`plus-minus-${id}`} className="flex flex-row justify-center items-center gap-1">
      <div onClick={() => setValue({id: id, [name]: value > 0 ? value - 1 : value})}
           className="cursor-pointer flex items-center justify-center bg-yellow-gradient h-[30px] w-[30px] rounded-[3px]">
        <img src={minus} alt="minus" className="w-[10px] h-auto"/>
      </div>
      <div
        className="cursor-none flex items-center justify-center h-[30px] w-[30px] bg-yellow-gradient rounded-[3px]">
        <p className="text-black text-sm font-poppins font-thin">{value}</p>
      </div>
      <div onClick={() => setValue({id: id, [name]: value < limit ? value + 1 : value})}
           className="cursor-pointer flex items-center justify-center bg-yellow-gradient h-[30px] w-[30px] rounded-[3px]">
        <img src={plus} alt="plus" className="w-[10px] h-auto"/>
      </div>
    </div>
  )
}

export default PlusMinusButton