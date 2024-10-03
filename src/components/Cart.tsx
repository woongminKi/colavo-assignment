import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { List } from './@types/List';

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<{ [key: string]: List }>({});
  const [discountItems, setDiscountItems] = useState([]);
  const { clickedList } = location.state || { clickedList: [] };
  console.log('items::', items);
  console.log('clickedList::', clickedList);

  const openItemList = () => {
    navigate('/list', { state: { items } }); // state로 items 전달
  };
  const openDiscountList = () => {
    // window.location.href = '/discount';
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
      );
      console.log('listData::', data);
      setItems(data.items);
      setDiscountItems(data.discounts);
    } catch (error) {
      console.log('error in fetch data::', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <CartWrapper>
        <ContentWrapper>
          <Button color='#E0E0E0' fontColor='#A0A0A0' onClick={openItemList}>
            + 시술
          </Button>
          <Button
            color='#FFE0E5'
            fontColor='#FF6B81'
            onClick={openDiscountList}
          >
            + 할인
          </Button>
        </ContentWrapper>

        <div style={{ flex: 1 }}>
          {clickedList.map((id: string | any) => {
            return (
              <ListWrapper key={id}>
                <Row>
                  <MainText>{String(items[id]?.name)}</MainText>
                  <SubText>{String(items[id]?.price)}원</SubText>
                </Row>
                <div>{String(items[id]?.count)}</div>
              </ListWrapper>
            );
          })}
        </div>

        <BottomButtonWrapper>
          <BottomText>
            <div>합계</div>
            <h2>0원</h2>
          </BottomText>
          <BottomButton>다음</BottomButton>
        </BottomButtonWrapper>
      </CartWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CartWrapper = styled.div`
  display: 'flex';
  flexdirection: 'column';
  justifycontent: 'space-between';
  position: 'relative';
  minheight: '100vh';
`;

const Button = styled.button<{ fontColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44%;
  height: 50px;
  background-color: ${(props) => props.color || '#ae9ef0'};
  color: ${(props) => props.fontColor || 'white'};
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
`;

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 10px 0;
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
`;
const BottomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94%;
  height: 50px;
  margin: 0 auto;
  background-color: #ae9ef0;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
`;

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
