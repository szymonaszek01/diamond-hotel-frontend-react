import { defaultUser, locked } from '../../../assets';
import {
  CustomPhoneInput,
  CustomStandardInput,
  CustomUploadFileInput,
  Modal,
} from '../../../components';
import styles from '../../../style';

const UpdateForm = ({ title, form, error, onUpdate, onChange, isOAuth2User }) => {
  const warning = isOAuth2User && (title === 'email' || title === 'password');

  const renderRow = (input, index) => {
    const isError = () => {
      return error.fields.find((field) => field === input.name);
    };

    const imageConfig = {
      visible: true,
      default: input.picture === null,
      src: input.picture ? 'data:image/png;base64,' + input.picture : defaultUser,
      alt: 'user-image',
    };

    const renderInput = () => {
      if (input.name === 'image') {
        return (
          <CustomUploadFileInput
            attributes={input}
            error={isError()}
            onChange={onChange}
            image={imageConfig}
          />
        );
      } else if (input.name === 'phone') {
        return <CustomPhoneInput attributes={input} error={isError()} onChange={onChange} />;
      } else {
        return <CustomStandardInput attributes={input} error={isError()} onChange={onChange} />;
      }
    };

    return (
      <div
        key={`row-${title}-${index}`}
        className={`flex flex-col sm:flex-row items-center justify-between px-4 pb-4 ${
          index === 0 ? 'pt-8' : 'pt-4'
        }`}>
        <div className="flex sm:w-[30%] w-full justify-start">
          <h2
            className={`${styles.paragraph} ${
              title === 'image' ? 'hidden sm:block' : ''
            } text-white text-xs`}>
            {input.label.charAt(0).toUpperCase() + input.label.slice(1)}
          </h2>
        </div>
        <div
          className={`flex sm:w-[60%] w-full ${
            title === 'image' ? 'justify-center' : 'justify-start'
          }`}>
          {renderInput()}
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="flex flex-col">
        {form.map((input, index) => renderRow(input, index))}
        <div className="flex flex-col sm:flex-row items-center justify-start px-4 py-4">
          <Modal
            button={`Update ${title}`}
            header={`Confirmation`}
            body={`Do you want to update user ${title}?`}
            action={onUpdate}
            warning={
              title === 'email'
                ? 'You will be signed out. Then, you will have to confirm account again.'
                : null
            }
          />
        </div>
      </div>
    );
  };

  const renderWarning = () => {
    return (
      <div className="flex flex-col justify-center items-center gap-5 p-5">
        <img src={locked} alt="locked" className="w-[125px] h-[125px]" />
        <p className={`${styles.paragraph} text-white text-sm`}>
          You can't change {title}, because you are signed in via google account.
        </p>
      </div>
    );
  };

  return (
    <div
      key={`update-from-${title}`}
      className={`${styles.boxWidth} bg-black-gradient rounded-[10px] box-shadow z-[0] sm:z-[99] w-full flex flex-col`}>
      <div className="flex flex-col sm:flex-row items-center justify-start border-white border-b-[0.05rem] p-4">
        <h2 className={`${styles.paragraph} text-white text-xl`}>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
      </div>
      {warning ? renderWarning() : renderForm()}
    </div>
  );
};

export default UpdateForm;
