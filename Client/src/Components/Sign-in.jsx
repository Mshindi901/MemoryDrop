/* eslint-disable no-unused-vars */
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
export default function SignIn({onBackToSignUp}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmitLoginForm = async (e) => {
        e.preventDefault();
        try {
        const data = await axios.post('https://memorydrop.onrender.com/api/login', {
            email,
            password
        });
        if(data.data.success){
            //Clearing the Local storage first
            localStorage.clear();
            console.log(data.data.user);
            localStorage.setItem('User', JSON.stringify(data.data.user));
            console.log('Account Created Successfully');
            navigate('/');
        }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className="md:w-full w-full h-fit flex justify-center items-center p-5">
                <form action="" method="post" className="md:w-1/4 w-full h-fit p-3 flex flex-col gap-4 bg-card rounded-2xl shadow-xl animate-slideInLeft" onSubmit={handleSubmitLoginForm}>
                    <h1 className="text-center md:text-3xl text-2xl font-bold font-body text-blue-500">Hello There!!</h1>
                    <p className="text-center text-text font-body font-semibold md:text-2xl text-xl">Please Fill all the Details</p>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={email} className="w-full outline-none border border-black rounded-2xl py-3" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} className="w-full outline-none border border-black rounded-2xl py-3" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>

                    <input type="submit" value="Login" className="w-full py-4 border rounded-2xl shadow-lg bg-blue-500 text-white font-bold"/>
                </form>
            </div>
        </>
    )
}
