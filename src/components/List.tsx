import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import comma from '../util/comma';
import { addClickedItem } from '../feature/itemList/itemSlice';

export default function ItemList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: any) => state.itemReducer.itemList[0]);
  const [clickedList, setClickedList] = useState<string[]>([]);
  const clickedListSaved = useSelector(
    (state: any) => state.itemReducer.clickedItemList[0]
  );

  const handleClick = (id: string) => {
    if (clickedList.includes(id)) {
      setClickedList(clickedList.filter((item) => item !== id));
    } else {
      setClickedList([...clickedList, id]);
    }
  };
  const handleSubmit = () => {
    dispatch(addClickedItem(clickedList));
    navigate('/cart');
  };
  const goToCart = () => {
    navigate('/cart');
  };

  useEffect(() => {
    if (clickedListSaved !== undefined) {
      setClickedList(clickedListSaved);
    }
  }, [clickedList]);

  return (
    <div>
      {items !== undefined ? (
        Object.keys(items)?.map((id: string) => {
          return (
            <ListWrapper>
              <Row key={id} onClick={() => handleClick(id)}>
                <MainText>{items[id].name}</MainText>
                <SubText>{comma(items[id].price)}원</SubText>
              </Row>
              {clickedList.includes(id) && <FaCheck color='#ae9ef0' />}
            </ListWrapper>
          );
        })
      ) : (
        <div>
          데이터가 불러오지 않았어요.
          <br />
          다시 돌아가서 실행해주세요.
          <br />
          <Button onClick={goToCart} style={{ marginTop: '8px' }}>
            홈으로 가기
          </Button>
        </div>
      )}

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
const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #ae9ef0;
  color: #ae9ef0;
  background-color: #fff;
  border-radius: 4px;
`;
