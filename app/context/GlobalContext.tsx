import React, {
  createContext,
  memo,
  useContext,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { UserType } from "@/app/types/types";

interface GlobalContextType {
  connectedUser: string;
  connectUser: (userId: string) => void;
  ethAddress: string;
  setEthAddress: (trugId: string) => void;
  disconnectUser: () => void;
  userData: UserType;
  setUserData: React.Dispatch<React.SetStateAction<UserType>>;
}

const useProviderGlobalContext = () => {
  const router = useRouter();
  const [connectedUser, setConnectedUser] = useState("");
  const [userData, setUserData] = useState({} as UserType);
  const [ethAddress, setEthAddress] = useState("");

  function connectUser(userId: string) {
    setConnectedUser(userId);
  }
  const disconnectUser = () => {
    setConnectedUser("");
  };

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/auth/me");
      const user = await res.json(); 
      console.log({user})
      connectUser(user._id);
      setUserData(user);
      setEthAddress(user.address);
    })();
  }, []);

  return {
    connectUser,
    connectedUser,
    disconnectUser,
    userData,
    setUserData,
    ethAddress,
    setEthAddress
  };
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobal = () => useContext(GlobalContext);

function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const context = useProviderGlobalContext();

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

export default memo(GlobalContextProvider);