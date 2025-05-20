import LovedOnes  from '../assets/Images/Love.png';
import MileStones from '../assets/Images/Milestones.png';
import Happy from '../assets/Images/Happy.png';
import {useNavigate} from 'react-router-dom'

export default function Memories () {
    const navigate = useNavigate();
    return (
        <>
            <section className='w-full h-fit md:p-3 p-6 flex justify-center items-center flex-col gap-6'>
                <h1 className='md:text-4xl text-3xl font-body font-bold text-blue-500'>About Memory Drop</h1>

                <div className='md:w-2/3 w-full h-fit p-4 grid md:grid-cols-3 grid-cols-1 gap-8 animate-slideInLeft'>
                    <div className='w-full min-h-86 p-5 bg-card flex flex-col gap-3 justify-center items-center rounded-2xl shadow-2xl'>
                        <img src={LovedOnes} alt="Loved Ones" className='w-full h-auto object-center'/>

                        <h1 className='md:text-3xl text-2xl font-bold font-body text-blue-500 text-center'>Loved Ones</h1>
                        <p className='md:text-2xl text-xl font-semibold text-text font-heading text-center w-full'>Take a photo of someone who means a lot to you. Their smile today could become your favorite memory tomorrow.</p>
                    </div>

                    <div className='w-full min-h-86 p-5 bg-card flex flex-col gap-3 justify-center items-center rounded-2xl shadow-2xl'>
                        <img src={MileStones} alt="Mile Stones in Life" className='w-full h-auto object-center'/>

                        <h1 className='md:text-3xl text-2xl font-bold font-body text-blue-500 text-center'>MileStones</h1>
                        <p className='md:text-2xl text-xl font-semibold text-text font-heading text-center w-full'>
                            Take a photo of something that reminds you of an achievement you've made — To remind you about all the small wins in your life.
                        </p>
                    </div>

                    <div className='w-full min-h-86 p-5 bg-card flex flex-col gap-3 justify-center items-center rounded-2xl shadow-2xl'>
                        <img src={Happy} alt="Self Love" className='w-full h-auto object-center'/>
                        <h1 className='md:text-3xl text-2xl font-bold font-body text-blue-500 text-center'>Self Love</h1>
                        <p className='md:text-2xl text-xl font-semibold text-text font-heading text-center w-full'>
                            Snap a photo of something that defines your current self — your journal, a playlist, your desk setup, or a drawing.
                        </p>
                    </div>
                </div>
                <button className='md:w-1/5 w-full py-4 rounded-2xl shadow-xl bg-blue-500 font-bold text-2xl text-white' onClick={() => {
                    navigate('/memory');
                }}>Add Memories
                </button>
            </section>
        </>
    )
}