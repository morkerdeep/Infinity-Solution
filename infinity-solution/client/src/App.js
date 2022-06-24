import './App.css';
import TeacherLogin from './component/TeacherLogin';
import { Routes, Route } from "react-router-dom"
import Home from './component/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TeacherLogin />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
