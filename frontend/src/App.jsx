import { Routes, Route } from 'react-router-dom';
import SkipLink from './components/SkipLink';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListaEspetaculos from './pages/ListaEspetaculos';
import EspetaculoDetalhe from './pages/EspetaculoDetalhe';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/espetaculos" element={<ListaEspetaculos />} />
        <Route path="/espetaculos/:id" element={<EspetaculoDetalhe />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
