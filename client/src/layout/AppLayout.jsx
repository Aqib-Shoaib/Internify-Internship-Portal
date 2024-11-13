import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Main = styled.main`
  width: 100vw;
  overflow: hidden;
`;
const StyledAppLayout = styled.div`
  max-width: 100vw;
  overflow: hidden;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
