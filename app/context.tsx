"use client"

import React, { Context, createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface IGlobal {
  width: string,
  modal: {open: boolean, type: string},
  signin: boolean,
  handleSignin: () => void,
  handleSignout: () => void,
  setWidth: React.Dispatch<React.SetStateAction<string>>,
  handleCloseModal: () => void,
  openModal: (type: string) => void,
};

export const MainContext = createContext<IGlobal>({} as IGlobal);

export function useMainContext() {
  if (!MainContext) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return React.useContext(MainContext);
}

function MainContextProvider({ children }: any) {
  const [signin, setSignin] = useState(false);
  const [width, setWidth] = useState("60%");
  const [modal, setModal] = useState({open: false, type: ""});

  function handleCloseModal() {
    setModal({...modal, open: false});
  }

  function openModal(type: string) {
    setModal({open: true, type: type});
  }

  function handleSignin() {
    setSignin(true);
  }

  function handleSignout() {
    setSignin(false);
  }

  return (
    <MainContext.Provider
      value={{
        modal,
        width,
        signin,
        setWidth,
        handleCloseModal,
        openModal,
        handleSignin,
        handleSignout
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
