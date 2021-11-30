import React, {useMemo, useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import { storage } from './firebase';
import {Button} from 'react-bootstrap';
// import { propTypes } from 'react-bootstrap/esm/Image';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 300,
  height: 280,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const baseStyle = {
  flex: 1,
  height: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  background: 'rgba(245, 245, 245, 0.6)',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const DropZone = (props) =>  {
  const [files, setFiles] = useState([]);
  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({maxFiles:1,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  
  const thumbs = files.map(file => (
    <div style={thumb} className="thumb" key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(files[0].name);  
    
    try{
      const uploadTask = storage.ref(`images/${files[0].name}`).put(files[0]); 
      uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round (
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(progress);
            },
            (error) => {
                //error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(files[0].name)
                    .getDownloadURL()
                    .then(url => {
                      props.handleCallback(url);                    
                    })
            }
        );
      alert("Image uploaded successfully");      
      setFiles([]);
    }catch (error) {
            console.log(error);
            alert('unsuccessful');
        }
  }
  
  useEffect(()  => {         
    files.forEach(file => {     
      URL.revokeObjectURL(file.preview);      
    });
  }, [files]);


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs} 
        <Button variant="primary" className="frm-btn" type="submit" style={{width:"30%"}} onClick={handleUpload}>
          Upload
        </Button>       
      </aside>
    </section>
  );
}

export default DropZone;