import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useGlobal } from "@/app/context/GlobalContext";
import styled from "styled-components";
import Link from "next/link";

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
    max-width: 70vw;
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

  .btn {
    background: none;
    border: none;
    text-align: center;
    font-size: 1rem;
    color: #0f0025ff;
    background-color: white;
    padding: 0.8rem 1.8rem;
    border-radius: 2rem;
    cursor: pointer;
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

const Home: NextPage = () => {
  const { connectedUser } = useGlobal();

  return (
    <div>
      <Head>
        <title>Trug</title>
        <meta
          name="description"
          content="One Stop Decentralized File Storage"
        />
      </Head>
      <div className="flex flex-col bg-[#0f0025ff] text-white w-full font-default h-screen">
        <Container>
          <img src="/logo1.svg" className="h-8 mx-auto my-6" />
          <div className="container">
            <div className="card flex flex-col gap-8 items-center">
              <h1 className="text-3xl font-bold leading-relaxed text-center">
                Decentralized File Storage + Contract Level Access + Sybil
                Protection + File Marketplace
              </h1>
              <p className="italic">Can&apos;t get any better !</p>
              {!connectedUser ? (
                <ConnectButton />
              ) : (
                <Link href={`/dashboard`}>
                  <button className="btn font-bold">Get Started</button>
                </Link>
              )}
            </div>
            <div className="blob"></div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
