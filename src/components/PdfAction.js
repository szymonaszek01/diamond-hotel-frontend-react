import { decodeBase64ToByteArray, randomCode, toPdfResponseMapper } from '../util';
import { pdf } from '../assets';

const PdfAction = ({ api, id }) => {
  const getPdfOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await api({ id }).unwrap();
      const { fileName, encodedFile } = toPdfResponseMapper(response);
      const byteArray = decodeBase64ToByteArray(encodedFile);
      const fileUrl = window.URL.createObjectURL(
        new Blob([byteArray], {
          type: 'application/pdf',
        })
      );

      let a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName;
      a.click();
    } catch (error) {
      console.log('Failed, to load pdf document');
    }
  };

  return (
    <div
      key={`pdf-action-${randomCode(3)}`}
      className="flex w-full flex-row items-center justify-start gap-2 cursor-pointer"
      onClick={getPdfOnClick}>
      <img src={pdf} alt={'pdf'} className={`w-[17px] h-auto`} />
      <p className="font-poppins font-thin text-xs text-black">{'Pdf'}</p>
    </div>
  );
};

export default PdfAction;
