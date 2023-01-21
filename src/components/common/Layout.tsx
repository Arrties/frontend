import React from 'react'
import styled from 'styled-components'

const LayoutBox = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutBox className="font-Pretendard w-full px-6 pt-[45px] pb-20 border h-[812px] relative overflow-y-auto ">
      {children}
    </LayoutBox>
  );
}
