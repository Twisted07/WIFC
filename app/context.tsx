"use client"

import React, { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface TGlobal {
  width: string
  setWidth: React.Dispatch<React.SetStateAction<string>>
};

export const MainContext = createContext<TGlobal | undefined>(undefined);

function GlobalContextProvider({ children }: any) {
  
  const [width, setWidth] = useState("60%");



  return (
    <MainContext.Provider
      value={{
        width,
        setWidth,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default GlobalContextProvider;
