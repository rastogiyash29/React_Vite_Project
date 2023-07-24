import './App.css'
import FirstPage  from './components/firstPage/FirstPage'
import SecondPage from './components/secondPage/SecondPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/first-page' element={<FirstPage/>}/>
          <Route path='/second-page' element={<SecondPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
