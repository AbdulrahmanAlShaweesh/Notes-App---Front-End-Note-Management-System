import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 p-5 flex flex-col justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
