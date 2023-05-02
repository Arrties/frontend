import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative h-full w-full max-w-[26.25rem] overflow-y-scroll bg-white px-[1.5rem]">
      {children}
    </div>
  );
}
