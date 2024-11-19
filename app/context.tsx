"use client"

import React, { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface IGlobal {
  width: string,
  modal: boolean,
  setWidth: React.Dispatch<React.SetStateAction<string>>,
  handleCloseModal: () => void,
  openModal: () => void,
};

export const MainContext = createContext<IGlobal | undefined>(undefined);

function MainContextProvider({ children }: any) {
  
  const [width, setWidth] = useState("60%");
  const [modal, setModal] = useState(false);

  function handleCloseModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }


  return (
    <MainContext.Provider
      value={{
        modal,
        width,
        setWidth,
        handleCloseModal,
        openModal
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
