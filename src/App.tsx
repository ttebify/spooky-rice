import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { IconContext } from "react-icons";
import { ToastsProvider, ToastListener } from "./contexts/ToastContext";
import { getLibrary } from "./utils/web3React";
import ModalProvider from "./components/Modal/ModalContext";
import AppWalletProvider from "./contexts/AppContext";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import HomePage from "./pages/index";
import MintPage from "./pages/mint";
import AdminPage from "./pages/panel";
import NotFound from "./pages/404";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import FadeTransitionRouter from "./pages/shared/FadeTransitionRouter";

/**
 * This component is used to share state accross all sections of the site without unmounting on page
 * navigation.
 */
export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppWalletProvider>
        <ToastsProvider>
          <ToastListener />
          <ModalProvider>
            <IconContext.Provider value={{ className: "w-6 h-6" }}>
              <RefreshContextProvider>
                <Navbar />
                <FadeTransitionRouter>
                  <HomePage path="/" />
                  <MintPage path="/mint" />
                  <AdminPage path="/~panel~~/s/invoke/spooky" />
                  <NotFound default />
                </FadeTransitionRouter>
                <Footer />
              </RefreshContextProvider>
            </IconContext.Provider>
          </ModalProvider>
        </ToastsProvider>
      </AppWalletProvider>
    </Web3ReactProvider>
  );
}
