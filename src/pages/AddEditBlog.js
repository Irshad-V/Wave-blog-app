import React, { useEffect, useState } from 'react'
import InputTag from '../components/InputTag';
import { db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';
import CloseBtn from '../components/CloseBtn';
import { useNavigate } from 'react-router-dom';


const initalState = {
  title: "",
  tags: [],
  trending: "",
  category: "",
  description: " "
};
const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

function AddEditBlog({ user, setActive }) {
  const [form, setForm] = useState(initalState);
  const [file, setFile] = useState(null);
  const { title, tags, category, trending, description } = form;
  const [notification, setNotification] = useState(false)
  const [btn, setBtn] = useState({})
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate()

  console.log("form will show here.....");
  console.log(form)
  console.log(tags)
  useEffect(() => {
    console.log("form will show here..use effect...");
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // code from firebase documentaion  for file upload

      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');

              break;
            case 'running':
              console.log('Upload is running');

              break;
            default:
              console.log('Upload ...');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          setNotification(true)
          setBtn({ ...btn, Name: "Err", Info: "not uploaded" })
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            setForm((prev) => ({ ...prev, imgUrl: downloadURL }));

          });
        }
      );


    }
    file && uploadFile();
  }, [file, btn]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log("handle cahnge ")
  };

  const updateTags = (newTags) => {
    setForm({ ...form, tags: newTags });
  };
  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
    console.log(e.target.value);
    console.log("handle cahnge trending...")

  }

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
    console.log(e.target.value);
    console.log("handle cahnge oncategary chage")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length > 100) {
      setNotification(true)
      setBtn({ ...btn, Name: "Err", Info: "length of title is over than 100 word " })
      return
    }

    if (category && tags && title && description && trending) {
      try {
        const postCollectionRef = collection(db, "Posts")
        await addDoc(postCollectionRef, {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
        })
        setNotification(true)
        setBtn({ ...btn, Name: "Err", Info: "Added Successfully completed" })
        console.log("databse added")
        setNotification(true)
        setBtn({ ...btn, Name: "Success", Info: "Added Successfully Completed" })
        setTimeout(() => {
          setActive("home")
          navigate("/");
        }, 2000);



      } catch (error) {
        console.log(error);

      }
    } else {
      setNotification(true)
      setBtn({ ...btn, Name: "Err", Info: "All Field Mandatory" })
    }
    console.log("forrm submited")
    console.log(form);

  }





  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className='col-12 text-center p-3 fw-6 fs-22'>
          Create Blogs
        </div>
        {notification && (<CloseBtn Name={btn.Name} Info={btn.Info} closeClick={setNotification} />)}
        <div className='row  justify-content-center align-items-center'  >
          <div className='col-10 col-md-8 col-lg-6   ' >
            <form className='row blog-form' onSubmit={handleSubmit}>
              <div className='col-12 py-3'>
                <input type='text'
                  className='form-control input-text-box'
                  name='title'
                  placeholder='Title'
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className='col-12 py-3'>
                <InputTag updateTags={updateTags} />
              </div>

              <div className="col-12 py-3 d-flex trending-div w-100 text-center" >
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}

                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className='col-12 py-3 '>

                <select
                  value={category}
                  onChange={onCategoryChange}
                  className='catg-dropdown'
                >
                  <option value=""  >Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}

                </select>
              </div>
              <div className='col-12 py-3'>
                <textarea className='form-control form-description'
                  placeholder='Description'
                  value={description}
                  name='description'
                  onChange={handleChange}
                />
              </div>

              <div className='mb-3'>
                <input type='file'
                  className='form-control'
                  onChange={(e) => { setFile(e.target.files[0]) }}
                />
              </div>
              <div className='col-12 py-3 text-center'>
                <button className='btn btn-add' disabled={progress !== null && progress < 100}>Submit</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddEditBlog
