import HeroSection from "../Components/Hero section.jsx";
import Memories from "../Components/Add-memory.jsx";
import UserMemory from "../Components/My-memory.jsx";
export default function Page(){
    return (
        <>
            <HeroSection/>
            <Memories/>
            <UserMemory/>
        </>
    )
}