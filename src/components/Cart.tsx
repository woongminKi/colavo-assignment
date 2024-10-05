import React, { useEffect, useState, useMemo } from 'react';
import CountBox from './CountBox';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { List } from './@types/List';
import { DiscountNewTarget } from './@types/Discount';
import comma from '../util/comma';
import { addItem } from '../feature/itemList/itemSlice';
import { addDiscountItem } from '../feature/discountItems/discountSlice';
import DiscountModal from './DiscountModal';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [items, setItems] = useState<{ [key: string]: List }>({});
  const [discountItems, setDiscountItems] = useState<{
    [key: string]: DiscountNewTarget;
  }>({});
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const clickedList = useSelector(
    (state: any) => state.itemReducer.clickedItemList[0]
  );
  const clickedDiscountList = useSelector(
    (state: any) => state.discountReducer.clickedDiscountList[0]
  );

  if (Object.keys(items).length > 0) {
    dispatch(addItem(items));
  }
  if (Object.keys(discountItems).length > 0) {
    dispatch(addDiscountItem(discountItems));
  }

  const openItemList = () => {
    navigate('/list');
  };
  const openDiscountList = () => {
    navigate('/discount');
  };

  const handleCount = (id: string, count: number) => {
    const newItems = { ...items };
    newItems[id] = { ...newItems[id], count };
    setItems(newItems);
  };
  const handleModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  useMemo(() => {
    let sum = 0;
    let sumDiscount = 0;
    let itemsPrice: number[] = [];
    let discountPrice: number[] = [];
    if (Object.keys(items).length > 0 && clickedList !== undefined) {
      itemsPrice = clickedList.map((id: string): number => {
        if (items[id].count < 0) {
          items[id].count = 0;
        }
        return Number(items[id]?.price * items[id].count);
      });
      itemsPrice.forEach((price: number) => {
        if (price < 0) {
          price = 0;
        }
        sum += price;
      });

      if (
        Object.keys(discountItems).length > 0 &&
        clickedDiscountList !== undefined
      ) {
        Object.keys(clickedDiscountList).forEach((id: string) => {
          clickedDiscountList[id].target.forEach((elem: string) => {
            if (clickedList.includes(elem)) {
              discountPrice.push(
                Number(
                  items[elem].price * items[elem].count * discountItems[id].rate
                )
              );
            }
          });
        });
      }
      discountPrice.forEach((price: number) => {
        if (price < 0) {
          price = 0;
        }
        sumDiscount += Math.round(price);
      });

      if (sum - sumDiscount < 0) {
        setTotalPrice(0);
      } else {
        setTotalPrice(sum - sumDiscount);
      }
    }
  }, [items]);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
      );
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
          <Button bgColor='#E0E0E0' fontColor='#A0A0A0' onClick={openItemList}>
            + 시술
          </Button>
          <Button
            bgColor='#FFE0E5'
            fontColor='#FF6B81'
            onClick={openDiscountList}
          >
            + 할인
          </Button>
        </ContentWrapper>

        <div style={{ flex: 1 }}>
          {Object.keys(items).length > 0 && clickedList !== undefined
            ? clickedList.map((id: string | any) => {
                return (
                  <ListWrapper key={id}>
                    <Row>
                      <MainText>{String(items[id]?.name)}</MainText>
                      <SubText>
                        {String(comma(items[id]?.price * items[id].count))}원
                      </SubText>
                    </Row>
                    <div>
                      {Object.keys(items).length > 0 ? (
                        <CountBox
                          props={handleCount}
                          items={items[id]}
                          id={id}
                        />
                      ) : null}
                    </div>
                  </ListWrapper>
                );
              })
            : null}
          {Object.keys(discountItems).length > 0 &&
          clickedDiscountList !== undefined
            ? Object.keys(clickedDiscountList).map((id: string) => {
                return (
                  <ListWrapper key={id} style={{ display: 'flex' }}>
                    <Row>
                      <MainText>{String(discountItems[id]?.name)}</MainText>
                      <SubText2>
                        {clickedList.map((id: string) => {
                          return items[id]?.count > 1
                            ? items[id]?.name + `x${items[id]?.count}` + ' '
                            : items[id]?.name + '' + ' ';
                        })}
                      </SubText2>
                      <SubTextDiscount>
                        {String(
                          '-' +
                            comma(
                              Math.round(
                                clickedDiscountList[id].target.reduce(
                                  (acc: number, elem: string) => {
                                    if (clickedList.includes(elem)) {
                                      return (
                                        acc +
                                        Number(
                                          items[elem].price *
                                            items[elem].count *
                                            discountItems[id].rate
                                        )
                                      );
                                    }
                                    return acc;
                                  },
                                  0
                                )
                              )
                            )
                        )}
                        원({Math.round(discountItems[id]?.rate * 100) + '%'})
                      </SubTextDiscount>
                    </Row>
                    <EditButton onClick={handleModal}>수정</EditButton>
                  </ListWrapper>
                );
              })
            : null}
        </div>

        {isOpenModal ? (
          <DiscountModal
            onOpen={isOpenModal}
            onClose={handleCloseModal}
            items={items}
            clickedList={clickedList}
            clickedDiscountList={clickedDiscountList}
          />
        ) : null}

        <BottomButtonWrapper>
          <BottomText>
            <div>합계</div>
            <h2>{comma(totalPrice)}원</h2>
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

const Button = styled.button<{ fontColor?: string; bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44%;
  height: 50px;
  background-color: ${(props) => props.bgColor || '#ae9ef0'};
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
  margin: 16px 14px;
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
const SubText2 = styled.div`
  font-size: 14px;
  color: #d3d3d3;
`;
const SubTextDiscount = styled.div`
  color: #ec8aae;
`;
const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border: 1px solid #ae9ef0;
  color: #ae9ef0;
  background-color: #fff;
  border-radius: 16px;
`;
