import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadErr, setImgUploadErr] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchposts = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.error);
          setPublishError(data.messge);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchposts();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  const handleUploadImg = async () => {
    setImgUploadErr(null);
    setImgUploadProgress(null);
    try {
      if (!file) {
        setImgUploadErr("Please only upload image!");
        return;
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progess =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgUploadProgress(progess.toFixed(0));
        },
        (error) => {
          setImgUploadErr(error);
          setImgUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImgUploadErr(null);
            setImgUploadProgress(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImgUploadErr("Upload Failed!");
      setImgUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.messge);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong!");
    }
  };
  return (
    <div className="p-3 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-center text-5xl my-10 font-semibold">
        Update a Post
      </h1>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            value={formData.title}
          ></TextInput>
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData.category}
          >
            <option value="uncategorized">Select a Category</option>
            <option value="A1">A1</option>
            <option value="B2">B2</option>
            <option value="C3">C3</option>
          </Select>
        </div>
        <div className="flex gap-8 items-center justify-between border-4 border-cyan-400 border-dotted p-10">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImg}
            disabled={imgUploadProgress}
          >
            {imgUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imgUploadProgress}
                  text={`${imgUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imgUploadErr && <Alert color="failure">{imgUploadErr}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write the Content..."
          className="h-80 mb-10"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
