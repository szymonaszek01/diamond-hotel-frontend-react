import CustomCloseTag from '../../../components/tag/CustomCloseTag';
import { CustomStandardInput } from '../../../components';
import { useState } from 'react';
import styles from '../../../style';

const AddRoomTypeEquipment = ({ form, onInputChange }) => {
  const [newEquipment, setNewEquipment] = useState('');

  const onCloseTag = (value) => {
    onInputChange(
      'equipment',
      form.equipment.value.filter((obj) => obj !== value)
    );
  };

  const onAddTag = (e) => {
    const equipment = form.equipment.value;
    if (equipment.find((obj) => obj === newEquipment) || newEquipment.length < 2) {
      return;
    }

    equipment.push(newEquipment);
    onInputChange('equipment', equipment);
  };

  return (
    <div key={`add-room-type-equipment`} className={'w-full flex flex-col mb-5 gap-5 text-start'}>
      <CustomStandardInput
        attributes={{
          type: 'text',
          label: 'New equipment',
          name: 'addEquipment',
          value: newEquipment,
        }}
        onChange={(e) => setNewEquipment(e.target.value)}
        label={true}
        customStyles={`w-full sm:w-[30%]`}
      />
      <div className={`w-full`} onClick={onAddTag}>
        <button className={`${styles.button} w-full sm:w-auto`}>Add</button>
      </div>
      <div className={`w-full flex flex-wrap gap-5 text-center`}>
        {form.equipment.value.map((obj) => (
          <CustomCloseTag value={obj} onClose={onCloseTag} />
        ))}
      </div>
    </div>
  );
};

export default AddRoomTypeEquipment;
