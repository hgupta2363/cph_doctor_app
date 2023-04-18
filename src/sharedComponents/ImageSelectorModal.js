import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './ImageSelector.css';
import CloseIcon from '@mui/icons-material/Close';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import Progress from 'react-progressbar';
import DoneIcon from '@mui/icons-material/Done';
import { storage } from '../data/firebaseInit';

export default function ImageSelectorModal({
  onComplete,
  onCompleteCtaText,
  onClose,
}) {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [imageBase64, setImageBase64] = useState('');
  const [file, setFile] = useState({});
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  console.log(progresspercent);

  console.log(imgUrl);
  const uploadImage = () => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  console.log();
  const resetData = () => {
    setImageBase64();
    setFile({});
    setProgresspercent(0);
  };
  useEffect(() => {
    if (progresspercent > 0) {
      setImageUploading(true);
    }
    if (progresspercent === 100) {
      setImageUploading(false);
      setImageUploaded(true);
    }
  }, [progresspercent]);
  const onImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      const base64File = await convertTobase64(file);
      setFile(file);
      setImageBase64(base64File);
    } catch (err) {
      console.log(err);
    }
  };
  const convertTobase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        resolve(error);
      };
    });
  };

  return (
    <div className='overlay'>
      <div className='popup_card'>
        <>
          <div className='close_icon' onClick={onClose}>
            <CloseIcon style={{ width: '20px', height: '20px' }} />
          </div>
          {!imageBase64 && (
            <>
              <label htmlFor='upload_icon'>
                <div>
                  <CloudUploadIcon
                    style={{ width: '80px', height: '80px', color: '#246bfd' }}
                  />
                  <p>Upload Prescribtion</p>
                </div>
              </label>
              <input
                id='upload_icon'
                type='file'
                style={{ opacity: 0 }}
                onChange={onImageChange}
              />
            </>
          )}

          {imageBase64 && (
            <>
              <img
                src={imageBase64}
                style={{ width: '200px', height: '100px' }}
                alt={'preview'}
              />
              <div
                style={{
                  position: 'relative',
                  bottom: '103px',
                  left: '93px',
                  backgroundColor: 'gray',
                  color: 'white',
                  borderRadius: '50%',
                }}
                onClick={resetData}
              >
                <CloseIcon style={{ width: '20px', height: '20px' }} />
              </div>
              {progresspercent === 100 ? (
                <>
                  <div className='success_uploaded'>
                    <DoneIcon
                      style={{
                        width: '20px',
                        height: '20px',
                        color: 'rgb(106, 191, 106)',
                      }}
                    />
                    <p className='success_uploaded_text'>uploaded</p>
                  </div>
                  <button
                    className='mark_appointment_done'
                    onClick={() => onComplete(imgUrl)}
                  >
                    {onCompleteCtaText}
                  </button>
                </>
              ) : progresspercent > 0 ? (
                <>
                  {console.log('progressing')}
                  <Progress completed={progresspercent} />
                </>
              ) : (
                <button className='upload_button_' onClick={uploadImage}>
                  upload
                </button>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}
