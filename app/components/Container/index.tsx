import { ReactNode } from "react";
import styled from "styled-components";

const BlurContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1rem;
  padding: 1.5rem;
  z-index: 10;
  color: whitesmoke;
`;

export default function Container({ children }: { children: ReactNode }) {
  return <BlurContainer>{children}</BlurContainer>;
}
