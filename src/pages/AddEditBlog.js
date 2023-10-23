import React, { useEffect, useState } from 'react'
import InputTag from '../components/InputTag';
import { db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore/lite';
import CloseBtn from '../components/CloseBtn';
import { useNavigate, useParams } from 'react-router-dom';


const initalState = {
  title: "",
  tags: [],
  trending: "",
  category: "",
  description: "",
  like: 0
};
const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
  "Poem",
  "travelogue,
  "Essay",
  "History",
  "Story"
  "Others"


  
];

function AddEditBlog({ user, setActive }) {
  const [form, setForm] = useState(initalState);
  const [file, setFile] = useState(null);
  const { title, tags, category, trending, description ,like} = form;
  const [notification, setNotification] = useState(false)
  const [btn, setBtn] = useState({})
  const [progress, setProgress] = useState(null);

  const navigate = useNavigate()
  const { id } = useParams()
  console.log("form will show here.....");
  const postCollectionRef = collection(db, "Posts");


  useEffect(() => {
    if (id) {
      const getBlogDetails = async () => {
        const postCollectionRef = collection(db, "Posts")
        const docRef = doc(postCollectionRef, id)
        try {
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data());
          if (docSnap) {
            setForm({ ...docSnap.data() })
            setActive(null)
          }

        } catch (error) {
          console.log(error)
        }
      }

      getBlogDetails()
    } else {
      setForm(initalState)
    }
  }, [id, setActive])




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
  console.log("image eeeeeeeeeee")
  console.log(file);
  console.log("image eeeeeeeeeee")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress("start.....")
    if (title.length > 100) {
      setNotification(true);
      setBtn({ ...btn, Name: "Err", Info: "Length of title is over than 100 words" });
      return;
    }

    if (category && tags && title && description && trending && (file || form.imgUrl)) {

      let uploadImageUrl = "image"
      console.log("uploadImageUrl")
      console.log(uploadImageUrl)


      if (file) {
        const storageRef = ref(storage, file.name);
        const snapshot = await uploadBytesResumable(storageRef, file);
        // Upload completed
        const downloadURL = await getDownloadURL(snapshot.ref);

        uploadImageUrl = downloadURL
      } else if (form.imgUrl) {
        console.log("form?.imgUrl")
        console.log(form?.imgUrl)

        const downloadURL = form?.imgUrl;
        uploadImageUrl = downloadURL

      }

      if (!id) {

        try {
          const docData = {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
            imgUrl: uploadImageUrl,
            like: like
          };
          const Alldata = await addDoc(postCollectionRef, docData);
          console.log(Alldata);
          console.log("all-data");
          setNotification(true);
          setBtn({ ...btn, Name: "Success", Info: "All files are stored" });
          console.log("All files are stored in Firebase");

          setTimeout(() => {
            setActive("home");
            navigate("/");
          }, 2000);
        } catch (error) {

          setProgress(null)
          setNotification(true);
          setBtn({ ...btn, Name: "Err", Info: "File storage has some issues" });
          console.error(error);
          console.log("File storage has some issues");
        }
      } else {

        try {
          await updateDoc(doc(postCollectionRef, id), {
            ...form,
            timestamp: serverTimestamp(),
            imgUrl: uploadImageUrl,
          });
          setNotification(true);
          setBtn({ ...btn, Name: "Success", Info: "Blog updated successfully" });
          console.log("updated")

          setTimeout(() => {
            setActive("home");
            setProgress(null)
            navigate("/");
          }, 2000);

        } catch (err) {
          setProgress(null)
          console.log(err);
          console.log("error here we will update tomorrow....insha allh")
        }


      }
    } else {
      setProgress(null)
      console.log("Err - All fields are mandatory")
      setNotification(true);
      setBtn({ ...btn, Name: "Err", Info: "All fields are mandatory" });
      return;
    }

    console.log("Form submitt   ed");
    console.log(form);

  };
  console.log("Formfgh");
  console.log(form);
  console.log("Formfgh");



  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className='col-12 text-center p-3 fw-6 fs-22'>
          {id ? "Update Blogs" : " Create Blogs"}

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
                <InputTag updateTags={updateTags} Alltag={form?.tags} />
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
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => { setFile(e.target.files[0]) }}
                />
              </div>

              {id && form?.imgUrl && !file && (
                <div className="col-12 py-3 d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <img src={form?.imgUrl} alt="Update" className="  height" />
                  </div>
                </div>
              )}

              <div className='col-12 py-3 text-center'>
                <button className='btn btn-add' type='submit' disabled={progress !== null} > {id ? "Update" : "Create"}</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddEditBlog
