import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { List } from './@types/List';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function ItemList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = location.state || { items: [] };
  const [clickedList, setClickedList] = useState<string[]>([]);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleClick = (id: string) => {
    if (isCheck) {
      setClickedList(clickedList.filter((item) => item !== id));
    } else {
      setClickedList([...clickedList, id]);
    }
    setIsCheck(!isCheck);
  };

  const handleSubmit = () => {
    navigate('/cart', { state: { clickedList } }); // state로 items 전달
  };

  return (
    <div>
      {Object.keys(items)?.map((id: string) => {
        return (
          <ListWrapper>
            <Row key={id} onClick={() => handleClick(id)}>
              <MainText>{items[id].name}</MainText>
              <SubText>{items[id].price}원</SubText>
            </Row>
            {clickedList.includes(id) && <FaCheck color='#ae9ef0' />}
          </ListWrapper>
        );
      })}

      <BottomButtonWrapper>
        <BottomText>서비스를 선택하세요(여러 개 선택가능)</BottomText>
        <BottomButton onClick={handleSubmit}>완료</BottomButton>
      </BottomButtonWrapper>
    </div>
  );
}

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 10px;
  padding: 8px 0;
`;
const Row = styled.div`
  width: 95%;
  text-align: left;
`;
const MainText = styled.div`
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const SubText = styled.div`
  color: #d3d3d3;
`;

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ae9ef0;
  padding: 16px 0 32px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BottomText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 16px;
  color: white;
`;
const BottomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94%;
  height: 50px;
  margin: 0 auto;
  background-color: #dad1ff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
`;
