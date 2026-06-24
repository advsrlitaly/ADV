// ✅ FIX 1: tutti gli import statici prima dei lazy
import { lazy, Suspense } from "react";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));

const App = () => {
  // ✅ FIX 2: Fragment esterno rimosso — LoadingProvider è l'unico figlio diretto
  // ✅ FIX 3: fallback={null} invece di Suspense vuoto — nessun flash di contenuto
  return (
    <LoadingProvider>
      <Suspense fallback={null}>
        <MainContainer>
          <Suspense fallback={null}>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

export default App;