import NoMemory from '../assets/Images/No memories.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function UserMemory(){
    const [memoryDisplay,setMemoryDisplay] = useState(false);
    const [name, setName] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [memory, setMemory] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'));
        console.log(user.id)
        console.log(user.username);
        if (user && user.name) {
            setUserInfo(user);
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
    }, [])
    const addMemory = async () => {
        if(userInfo){
            navigate('/memory');
        } else {
            navigate('/');
        }
    }   
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
                                            <button className='w-full py-3 rounded-2xl bg-blue-500 text-2xl font-bold font-heading text-white' onClick={async () => {
                                                const res = await axios.delete(`http://localhost:5000/api/delete-memory/${mem.id}`);
                                                if(res.data.success){
                                                    console.log('Memory Deleted Successfully');
                                                }
                                            }}>Delete Memory!</button>
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
