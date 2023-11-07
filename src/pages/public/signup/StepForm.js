import { motion } from 'framer-motion';
import { CustomPhoneInput, CustomStandardInput } from '../../../components';

const StepForm = ({ form, step, isError, onChange }) => {
  return (
    <motion.div
      key={`form-${step}`}
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      className="w-full flex flex-col mt-7 gap-7">
      {form
        .filter((input) => input.name !== 'phone')
        .map((input) => (
          <CustomStandardInput
            attributes={input}
            error={isError(input)}
            onChange={onChange}
            label={true}
          />
        ))}
      {form
        .filter((input) => input.name === 'phone')
        .map((input) => (
          <CustomPhoneInput
            attributes={input}
            error={isError(input)}
            onChange={onChange}
            label={true}
          />
        ))}
    </motion.div>
  );
};

export default StepForm;
