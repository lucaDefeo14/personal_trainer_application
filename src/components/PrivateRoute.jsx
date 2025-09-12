import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
