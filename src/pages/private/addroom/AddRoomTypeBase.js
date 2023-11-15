import { CustomStandardInput } from '../../../components';

const AddRoomTypeBase = ({ form, onInputChange }) => {
  return (
    <div
      key={`add-room-type-base`}
      className={`w-full flex flex-wrap justify-between gap-5 sm:gap-0 text-start`}>
      {Object.values(form)
        .filter((obj) => obj.name !== 'image' && obj.name !== 'equipment')
        .map((obj) => (
          <CustomStandardInput
            attributes={obj}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            label={true}
            customStyles={`w-full sm:w-[30%] mb-5`}
          />
        ))}
    </div>
  );
};

export default AddRoomTypeBase;
