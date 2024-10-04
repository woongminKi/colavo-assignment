import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import { List } from './@types/List';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import comma from '../util/comma';
import { addClickedDiscountItem } from '../feature/discountItems/discountSlice';

export default function Discount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const discountItems = useSelector(
    (state: any) => state.discountReducer.discountItems[0]
  );
  const [clickedDiscountList, setClickedDiscountList] = useState<string[]>([]);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  // console.log('discountItems::', discountItems);

  const handleClick = (id: string) => {
    if (isCheck) {
      setClickedDiscountList(clickedDiscountList.filter((item) => item !== id));
    } else {
      setClickedDiscountList([...clickedDiscountList, id]);
    }
    setIsCheck(!isCheck);
  };

  const handleSubmit = () => {
    dispatch(addClickedDiscountItem(clickedDiscountList));
    navigate('/cart');
  };

  return (
    <div>
      {discountItems !== undefined ? (
        Object.keys(discountItems)?.map((id: string) => {
          return (
            <ListWrapper>
              <Row key={id} onClick={() => handleClick(id)}>
                <MainText>{discountItems[id].name}</MainText>
                <SubText>{Math.round(discountItems[id].rate * 100)}%</SubText>
              </Row>
              {clickedDiscountList.includes(id) && <FaCheck color='#ae9ef0' />}
            </ListWrapper>
          );
        })
      ) : (
        <div>'새로고침을 해주세요.'</div>
      )}

      <BottomButtonWrapper>
        <BottomText>할인을 선택하세요(여러 개 선택가능)</BottomText>
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
  color: #ec8aae;
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
