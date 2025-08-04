import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Simple test components
const LoginPage = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>Login Page</h1>
    <p>This is the login page - working!</p>
  </div>
);

const HomePage = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>Home Page</h1>
    <p>This is the home page - working!</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
