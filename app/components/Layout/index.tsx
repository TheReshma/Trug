import styled from "styled-components";
import Link from "next/link";
import { useGlobal } from "@/app/context/GlobalContext";
import { Connect } from "../ConnectButton";
import { ReactNode } from "react";
import Navbar from "../Navbar";
import Sidebar from "@/app/modules/Sidebar";

const Container = styled.div`
  .container {
    min-height: 85vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .card {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 1rem;
    padding: 1.5rem;
    z-index: 10;
    color: whitesmoke;
  }

  .blob {
    position: absolute;
    width: 500px;
    height: 500px;
    background: linear-gradient(
      180deg,
      rgba(47, 184, 255, 0.42) 31.77%,
      #5c9df1 100%
    );
    mix-blend-mode: color-dodge;
    -webkit-animation: move 25s infinite alternate;
    animation: move 25s infinite alternate;
    transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
  }

  .blob:hover {
    width: 520px;
    height: 520px;
    -webkit-filter: blur(30px);
    filter: blur(30px);
    box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.6),
      inset 100px 100px 0 0px #330080f, inset 200px 200px 0 0px #784ba8,
      inset 300px 300px 0 0px #6600fff;
  }

  @-webkit-keyframes move {
    from {
      transform: translate(-100px, -50px) rotate(-90deg);
      border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
    }

    to {
      transform: translate(500px, 100px) rotate(-10deg);
      border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
    }
  }

  @keyframes move {
    from {
      transform: translate(-100px, -50px) rotate(-90deg);
      border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
    }

    to {
      transform: translate(500px, 100px) rotate(-10deg);
      border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
    }
  }
`;

export default function Layout({ children }: { children: ReactNode }) {
  const { connectedUser } = useGlobal();
  console.log(connectedUser);
  return (
    <div className="flex flex-col bg-[#0f0025ff] text-white w-full font-default h-screen">
      {connectedUser ? (
        <div>
          <Navbar />
          <div className="flex flex-row p-4">
            <Sidebar />
            {children}
          </div>
        </div>
      ) : (
        <Container>
          <img src="/logo1.svg" className="h-8 mx-auto my-6" alt="logo" />
          <div className="container">
            <div className="card flex flex-col gap-8 items-center lg:w-2/5 mx-4">
              <h1 className="text-3xl font-bold leading-relaxed text-center">
                Decentralized File Storage + Contract Level Access + Sybil
                Protection + File Marketplace
              </h1>
              <p className="italic">Can&apos;t get any better !</p>
              <Connect />
            </div>
            <div className="blob"></div>
          </div>
        </Container>
      )}
    </div>
  );
}
