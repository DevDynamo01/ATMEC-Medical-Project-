import { useEffect, useState, useContext } from 'react';
import { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import DataContext from '../context/dataContext';
const imageMimeType = /image\/(png|jpg|jpeg)/i;
function ImagePreview() {
  const { file, setFile, fileDataURL, setFileDataURL } = useContext(DataContext);
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  function clearInput() {
    setFile(null);
    setFileDataURL(null);
  }
  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div className="relative">
      <div>
        <button className="my-auto text-[0.5rem]" onClick={handleClick}>
          Select File
        </button>
        <input
          type="file"
          id="image"
          accept=".png, .jpg, .jpeg"
          ref={hiddenFileInput}
          onChange={changeHandler}
          style={{ display: 'none' }}
        />
      </div>
      {fileDataURL ? (
        <p
          onClick={clearInput}
          className="absolute w-[200px] h-[200px] overflow-hidden z-20 -top-[230px] right-[200px] p-4 border rounded-lg backdrop-blur-md"
        >
          <RxCross2 className="absolute right-0 top-0 size-[30px] hover:scale-125 cursor-pointer" />
          {<img className="w-full h-full" src={fileDataURL} alt="preview" />}
        </p>
      ) : null}
    </div>
  );
}
export default ImagePreview;
