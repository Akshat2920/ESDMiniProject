import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout({ loggedIn, handleLogout }) {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar loggedIn={loggedIn} handleLogout={handleLogout}/>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
export default MainLayout;