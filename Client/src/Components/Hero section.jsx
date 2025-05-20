import HeroBackground from '../assets/Images/Main-Background.jpg';
import { Link } from 'react-router-dom';
export default function HeroSection(){
    return (
        <>
            <div className="w-full min-h-screen"style={{backgroundImage: `url(${HeroBackground})`}}>
                <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4 bg-cover md:p-0 p-4 bg-center'>
                    <div className='md:w-2/3 w-full h-fit p-4 flex flex-col justify-center items-center gap-8 animate-dropDown'>
                        <h1 className='md:text-6xl text-4xl font-heading font-bold text-blue-500 text-center'>
                            Capture Moments. Save Them for Tomorrow.
                        </h1>

                        <p className='md:text-4xl text-2xl font-body text-white font-semibold text-center'>
                            Take photos of your most meaningful memories and store them in a digital time capsule — safe, personal, and always there when you need to look back.
                        </p>

                        <Link to='/forms' className='w-full md:w-1/4 py-4 rounded-2xl shadow-xl bg-blue-500 text-2xl text-white text-center font-bold'><span>Get Started</span></Link>
                    </div>
                </div>
            </div>
        </>
    )
}