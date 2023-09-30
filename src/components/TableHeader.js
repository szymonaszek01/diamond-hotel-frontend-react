import {randomCode} from "../util";
import {TableActionMenu, TableCell} from "./index";

const TableHeader = ({columnList}) => {
  return (
    <div key={`header-${randomCode(7)}`}
         className={`w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-0 sm:justify-between items-center p-0 sm:p-4`}>
      {
        columnList.map(column => <TableCell value={column} textColor={"text-gradient"} fontStyle={"font-bold"}/>)
      }
      <TableActionMenu hidden={true}/>
    </div>
  )
}

export default TableHeader