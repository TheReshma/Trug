import type { NextPage } from "next";
import MetaHead from "@/app/components/MetaHead";
import { useGlobal } from "@/app/context/GlobalContext";
import Layout from "@/app/components/Layout";
import Navbar from "@/app/components/Navbar";
import Dashboard from "@/app/modules/Dashboard";

const Home: NextPage = () => {
  const { connectedUser } = useGlobal();

  return (
    <div>
      <MetaHead />
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
};

export default Home;
