import { logout } from "@/app/services/Auth";
import { useGlobal } from "@/app/context/GlobalContext";

export default function Navbar() {
  const { connectUser } = useGlobal();
  return (
    <div className="flex flex-row justify-between p-4">
      <img src="/logo1.svg" className="h-6" />
      <button
        className="p-1 px-3 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 duration-700"
        onClick={() => {
          void logout();
          window.location.reload();
          connectUser("");
        }}
      >
        Logout
      </button>
    </div>
  );
}
