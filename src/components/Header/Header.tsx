import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const pagePath = location.pathname.split('/').slice(-1)[0];
  console.log(pagePath);

  const moveToHome = () => {
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <Button onClick={moveToHome}>✖️</Button>
      {pagePath === 'cart' ? (
        <>
          <HeaderTextWrapper>
            <HeaderText>곽지우</HeaderText>
            <SubHeaderText>2019. 6. 14. 오후 5:30</SubHeaderText>
          </HeaderTextWrapper>
          <Button></Button>
        </>
      ) : pagePath === 'product' ? (
        <>
          <HeaderText>시술메뉴</HeaderText>
          <Button>➕</Button>
        </>
      ) : (
        <>
          <HeaderText>할인</HeaderText>
          <Button>➕</Button>
        </>
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 22px;
`;
const HeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const HeaderText = styled.div`
  font-weight: bold;
`;
const SubHeaderText = styled.div`
  color: gray;
`;

const Button = styled.button`
  width: 40px;
  height: 100%;
  border: 1px solid white;
  background-color: white;
  color: gray;
  font-size: x-large;
`;
