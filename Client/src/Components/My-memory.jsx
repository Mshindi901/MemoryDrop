import NoMemory from '../assets/Images/No memories.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function UserMemory(){
    const [memoryDisplay,setMemoryDisplay] = useState(false);
    const [name, setName] = useState(null);
    const [memory, setMemory] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedUser = localStorage.getItem('User');
        if (!storedUser) {
            console.error("No user found in localStorage");
            navigate('/'); // optional: redirect to login or home
            return;
        }

        const user = JSON.parse(storedUser);
    
        if (!user?.id) {
            console.error("User object missing ID");
            navigate('/'); // again optional
            return;
        }
        const fetchData = async () => {
            try {
            const data = await axios.get(`https://memorydrop.onrender.com/api/get-memory/${user.id}`);
            if(data.data.success) {
                setMemory(data.data.memory);
                setName(data.data.memory[0].User.username);
                setMemoryDisplay(true);
            }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [navigate])
    const addMemory = () => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
        navigate('/memory');
    } else {
        navigate('/');
    }
};
   
    return (
        <>
            <section className="w-full h-fit p-5 flex justify-center items-center bg-blue-500">
                <div className="md:w-3/4 w-full h-fit p-5 flex justify-center items-center animate-slideInLeft">
                    {
                        !memoryDisplay &&
                        <div className="w-full md:w-2/3 flex justify-center items-center flex-col gap-5">
                            <img src={NoMemory} alt="No memories" className='w-1/7 h-1/7 object-center'/>
                            <p className='md:text-4xl text-3xl font-bold font-body text-white text-center'>Oops!! Sorry you have no memories to view</p>
                            <button className='md:w-1/5 w-full py-4 rounded-2xl shadow-xl bg-white font-bold text-2xl text-blue-500' onClick={addMemory}>Add Memories</button>
                        </div>
                    }
                    {
                        memoryDisplay &&
                        <div className="w-full h-fit p-4">
                            <h1 className='text-center md:text-2xl text-2xl font-bold text-white'>Hello {name}!!</h1>
                            <div className='w-full h-fit p-3 grid md:grid-cols-4 grid-cols-1 gap-4'>
                                {
                                    memory.map((mem) => (
                                        <div key={mem.id} className='w-full min-h-86 bg-card flex flex-col justify-center items-center gap-3 p-3 shadow-xl rounded-2xl'>
                                            <img src={mem.media} alt="Image of Memory" className='w-full h-1/2 rounded-2xl object-center'/>
                                            <p className='md:text-3xl text-2xl font-semibold font-body text-text text-center w-full'>{mem.description}</p>
                                            <button
                                                className='w-full py-3 rounded-2xl bg-blue-500 text-2xl font-bold font-heading text-white'
                                                onClick={async () => {
                                                    try {
                                                        const res = await axios.delete(`https://memorydrop.onrender.com/api/delete-memory/${mem.id}`);
                                                        if (res.data.success) {
                                                            console.log('Memory Deleted Successfully');
                                                            setMemory(memory.filter(item => item.id !== mem.id)); // remove from local state
                                                            if (memory.length - 1 === 0) {
                                                                setMemoryDisplay(false); // toggle back to no memories view
                                                            }
                                                        }
                                                    } catch (error) {
                                                        console.error('Error deleting memory:', error);
                                                    }
                                                }}
                                            >
                                                Delete Memory!
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}