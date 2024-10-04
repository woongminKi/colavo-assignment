import React from 'react';
import styled from 'styled-components';
import { List } from './@types/List';

interface CountBoxProps {
  props: (id: string, count: number) => void;
  items: List;
  id: string;
}

export default function CountBox({ props, items, id }: CountBoxProps) {
  if (items.count < 0) {
    items.count = 0;
    alert('0보다 작을 수 없습니다.');
  }
  return (
    <CountBoxWrapper>
      <div onClick={() => props(id, items.count - 1 || 0)}>-</div>
      {items.count}
      <div onClick={() => props(id, items.count + 1 || 0)}>+</div>
    </CountBoxWrapper>
  );
}

const CountBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: 50px;
  border: 1px solid #ae9ef0;
  color: #ae9ef0;
  background-color: #fff;
  border-radius: 16px;
`;
