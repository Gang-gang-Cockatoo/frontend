import React from 'react';

export default function Page({ children }) {
  return (
    <div className="page flex flex-col w-full h-screen pt-[72px]">
      {children}
    </div>
  );
}
