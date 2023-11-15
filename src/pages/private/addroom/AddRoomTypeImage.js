import { CustomUploadFileInput } from '../../../components';
import { toFileResponseMapper } from '../../../util';
import { toast } from 'react-toastify';
import { useCreateRoomTypeImageMutation } from '../../../redux/api/roomTypeApiSlice';

const AddRoomTypeImage = ({ form, onInputChange, image, setImage }) => {
  const imageConfig = {
    visible: false,
  };
  const [createRoomTypeImage] = useCreateRoomTypeImageMutation();

  const onChange = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.set('image', e.target.files[0]);
      const response = await createRoomTypeImage({ formData: formData }).unwrap();

      const { encodedFile, file } = toFileResponseMapper(response);
      setImage(encodedFile);
      onInputChange('image', file);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  return (
    <div key={`add-room-type-image`} className={`w-full flex flex-wrap text-start mb-5`}>
      <div
        key={`add-room-type-image`}
        className={`w-full flex items-center justify-center border-dashed border-white border-[1px] rounded-[4px] py-8`}>
        {image.length > 0 ? (
          <img
            src={`data:image/png;base64,${image}`}
            alt={`encodedFile`}
            className={`w-auto h-[300px] rounded-[4px] ${image.length === 0 ? 'hidden' : ''}`}
          />
        ) : (
          <p className={`font-poppins text-xs text-white`}>You have not choosen any file yet...</p>
        )}
      </div>
      <CustomUploadFileInput
        attributes={form.image}
        onChange={onChange}
        image={imageConfig}
        customStyles={`w-full`}
      />
    </div>
  );
};

export default AddRoomTypeImage;
