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

export default React.memo(function Layout({ children }: LayoutProps) {
  return (
    <LayoutBox className="relative h-full w-full max-w-[420px] overflow-y-scroll  bg-white px-[24px]">
      {children}
    </LayoutBox>
  );
});
