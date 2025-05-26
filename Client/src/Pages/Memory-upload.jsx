import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer, Bounce} from 'react-toastify'

export default function MemoryUpload(){
    const [media, setMedia] = useState(null);
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [uploadProgress, setUploadProgress] = useState(0);

    const notify =() => {
        toast.success('Memory Added Successfully', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('User');
        console.log(storedUser);
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser);
        if(storedUser){
            setUserId(parsedUser.id);
        } else {
            console.error('User ID not found!');
        }

    },[])
        const handleMemoryUploadForm = async (e) => {
        e.preventDefault();

        if (!media || !description) {
            alert("Please provide all required details.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('media', media);
            formData.append('description', description);
            formData.append('userId', userId);

            const res = await axios.post('https://memorydrop.onrender.com/api/memory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percent);
                }
            });

            if (res.data.success) {
                console.log("Memory uploaded successfully");
                localStorage.setItem('Memory', JSON.stringify(res.data.memory));
                setUploadProgress(0);
                notify() // Reset
                navigate('/');
            }

        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <>
            <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-center md:p-2 p-5">
                <form action="" method="post" className="md:w-2/3 w-full h-fit p-5 flex flex-col gap-3 border rounded-2xl shadow-2xl animate-dropDown" onSubmit={handleMemoryUploadForm}>
                    <h1 className="text-center md:text-3xl text-2xl font-body font-bold text-blue-500">Upload your Memory</h1>
                    <p className="text-center text-text font-body font-semibold md:text-2xl text-xl">Please Fill all the Details, to Upload Memory</p>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="media">Upload File</label>
                        <input type="file" id="media" className="w-full outline-none border border-black rounded-2xl py-3 px-1" onChange={(e) => {setMedia(e.target.files[0])}}/>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="description">Description</label>
                        <textarea name="" id="description" className="w-full outline-none border border-black rounded-2xl py-3 px-1" placeholder="Enter your Posts Description" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                    </div>
                    <input type="submit" value="Upload Memory" className="w-full py-4 border rounded-2xl shadow-lg bg-blue-500 text-white font-bold"/>
                </form>
                {uploadProgress > 0 && (
                    <div className="w-full bg-gray-300 rounded-full h-4 mt-4">
                        <div className="bg-blue-600 h-4 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}>
                        <span className="text-white text-xs font-bold ml-2">{uploadProgress}%</span>
                        </div>
                    </div>
                )}

            </div>
            <ToastContainer/>
        </>
    )
}