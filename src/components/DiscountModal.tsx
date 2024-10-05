import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { List } from './@types/List';
import { addClickedItem } from '../feature/itemList/itemSlice';
import comma from '../util/comma';
import { FaCheck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

export default function DiscountModal({
  onOpen,
  onClose,
  items,
  clickedList,
  clickedDiscountList,
}: {
  onOpen: boolean;
  onClose: any;
  items: { [key: string]: List };
  clickedList: string[];
  clickedDiscountList: string[];
}) {
  // console.log('items in modal::', items);
  // console.log('clickedDiscountList in modal::', clickedDiscountList);
  const dispatch = useDispatch();
  const [appliedDiscountList, setAppliedDiscountList] =
    useState<string[]>(clickedList);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleClick = (id: string) => {
    if (isCheck) {
      setAppliedDiscountList(clickedList.filter((item) => item !== id));
    } else {
      setAppliedDiscountList([...clickedList, id]);
    }
    setIsCheck(!isCheck);
  };
  const updateItemLists = () => {
    dispatch(addClickedItem(appliedDiscountList));
    onClose();
  };

  return (
    <>
      <Dimmed onClick={onClose} />
      <ModalWrapper>
        <div style={{ flex: 1 }}>
          {Object.keys(items).length > 0 && clickedList !== undefined
            ? clickedList.map((id: string | any) => {
                return (
                  <ListWrapper key={id}>
                    <Row onClick={() => handleClick(id)}>
                      <MainText>{String(items[id]?.name)}</MainText>
                      <SubText>
                        {String(comma(items[id]?.price * items[id].count))}원
                      </SubText>
                    </Row>
                    {appliedDiscountList.includes(id) && (
                      <FaCheck color='#ae9ef0' />
                    )}
                  </ListWrapper>
                );
              })
            : null}
        </div>
        <Button fontColor='#ec8aae' onClick={onClose}>
          삭제
        </Button>
        <Button onClick={updateItemLists}>확인</Button>
      </ModalWrapper>
    </>
  );
}

DiscountModal.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  items: PropTypes.object,
};

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0%;
  top: 0%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalWrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 330px;
  height: auto;
  position: absolute;
  margin-left: -180px;
  margin-top: -110px;
  padding: 16px;
  text-align: center;
  border-radius: 0.5rem;
  background-color: #fff;
  z-index: 1;
`;

const Button = styled.button<{ fontColor?: string }>`
  width: 40%;
  height: 40px;
  text-align: center;
  background-color: #fff;
  color: ${(props) => props.fontColor || '#000'};
  border-style: none;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 0.4rem;
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
