import {randomCode} from "../util";
import {TableHeader, TableRow} from "./index";

const Table = ({columnList, rowList, actionList}) => {
  return (
    <div key={`table-${randomCode(7)}`}
         className="flex flex-col items-start justify-center w-[100%] rounded-[3px] p-4 box-shadow outline-none">
      <TableHeader columnList={columnList}/>
      {
        rowList.map((row, index) => <TableRow index={index} columnList={columnList} cellList={row}
                                              actionList={actionList}
                                              isLastRow={index === rowList.length - 1}/>)
      }
    </div>
  )
}

export default Table