import React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children?: React.ReactNode;
}

export default React.memo(function Layout({ children }: LayoutProps) {
  return (
    <div className="relative h-full w-full max-w-[420px] overflow-y-scroll bg-white px-[24px]">
      {children}
    </div>
  );
});
