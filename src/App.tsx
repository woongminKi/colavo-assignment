import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Header from './components/Header/Header';
import Cart from './components/Cart';
import Discount from './components/Discount';
import List from './components/List';

function App() {
  const handleCartPage = () => {
    window.location.href = '/cart';
  };
  const location = useLocation();
  return (
    <div className='App'>
      {location.pathname === '/' ? (
        <Button onClick={handleCartPage}>결제 입력</Button>
      ) : (
        <AnimatedPage>
          <Header />
          <Routes>
            <Route path='/cart' element={<Cart />} />
            <Route path='/list' element={<List />} />
            <Route path='/discount' element={<Discount />} />
          </Routes>
        </AnimatedPage>
      )}
    </div>
  );
}

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AnimatedPage = styled.div`
  animation: ${slideUp} 0.5s ease-out;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  color: #fff;
  background-color: #ae9ef0;
  border-radius: 4px;
`;

export default App;
