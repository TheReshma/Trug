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
  trugId: string;
  setTrugId: (trugId: string) => void;
  disconnectUser: () => void;
  userData: UserType;
  setUserData: React.Dispatch<React.SetStateAction<UserType>>;
}

const useProviderGlobalContext = () => {
  const router = useRouter();
  const [connectedUser, setConnectedUser] = useState("");
  const [userData, setUserData] = useState({} as UserType);
  const [trugId, setTrugId] = useState("");

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
      connectUser(user._id);
      console.log({ connectedUser });
    })();
  }, []);

  return {
    connectUser,
    connectedUser,
    disconnectUser,
    userData,
    setUserData,
    trugId,
    setTrugId
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