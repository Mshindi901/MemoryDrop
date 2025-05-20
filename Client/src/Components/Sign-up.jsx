import  {useState} from 'react';
import axios from'axios';
import SignIn from './Sign-in.jsx';

export default  function SignUP(){
    const [loginDisplay, setLoginDisplay] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitRegistrationForm = async (e) => {
        e.preventDefault();
        try {
        const data = await axios.post('https://memorydrop.onrender.com/api/user', {
            username: name,
            email,
            password
        });
        if(data.data.success === true){
            console.log('Account Created Successfully');
            setLoginDisplay(true);
        }
        } catch (error) {
            console.log(error);
            setLoginDisplay(false);
        }

    }
    return (
        <>
            <div className='w-full min-h-screen flex justify-center items-center'>
                <div className="md:w-full w-full h-fit flex justify-center items-center p-5">
                    {
                        loginDisplay ? (
                            <SignIn onBackToSignUp = {() => {setLoginDisplay(false)}}/>
                        ) : 
                        (
                            <form action="" method='post' className="w-full md:w-1/4 h-fit p-3 flex flex-col gap-4 bg-card rounded-2xl shadow-xl animate-dropDown" onSubmit={handleSubmitRegistrationForm}>
                                <h1 className="text-center md:text-3xl text-2xl font-bold font-body text-blue-500">Welcome!!</h1>
                                <p className="text-center text-text font-body font-semibold md:text-2xl text-xl">Please Fill all the Details</p>
                                <p className="text-center text-text font-body md:text-2xl text-xl">Already have an account <button className='underline md:text-2xl text-xl text-blue-700 hover:no-underline' type='button' onClick={() => {
                                    setLoginDisplay(true);
                                }}>Login</button></p>

                                <div className="flex flex-col gap-3">
                                    <label htmlFor="name">Username</label>
                                    <input type="text" id="name" value={name} className="w-full outline-none border border-black rounded-2xl py-3" onChange={(e) => {setName(e.target.value)}}/>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" value={email} className="w-full outline-none border border-black rounded-2xl py-3" onChange={(e) => {setEmail(e.target.value)}}/>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" value={password} className="w-full outline-none border border-black rounded-2xl py-3" onChange={(e) => {setPassword(e.target.value)}}/>
                                </div>

                                <input type="submit" value="Create Account" className="w-full py-4 border rounded-2xl shadow-lg bg-blue-500 text-white font-bold"/>
                            </form>
                        )
                    }
                </div>
            </div>
        </>
    )
}
