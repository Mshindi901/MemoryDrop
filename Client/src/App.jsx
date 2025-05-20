import { Route, Routes } from "react-router-dom"
import Page from "./Pages/Home-page.jsx"
import Forms from "./Pages/Forms.jsx"
import MemoryUpload from "./Pages/Memory-upload.jsx"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Page/>}/>
      <Route path="/forms" element={<Forms/>}/>
      <Route path="/memory" element={<MemoryUpload/>}/>
    </Routes>
  )
}

export default App
