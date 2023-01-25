import React from 'react';
import styled from 'styled-components';

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
    <LayoutBox className="relative h-[calc(100vh-80px)] w-full overflow-scroll px-6 py-[45px]">
      {children}
    </LayoutBox>
  );
}
