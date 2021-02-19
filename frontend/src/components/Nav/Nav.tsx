import { Link } from 'react-router-dom';
import Logo from '../../assets/benchbae_logo.png';
import './Nav.css';

const Nav = ({ fade = false }: { fade?: boolean }) => {
  return (
    <div className={`nav-logo-container ${fade ? 'nav-logo-fade' : ''}`}>
      <Link className='nav-logo-link' to='/'>
        <img src={Logo} alt="Logo" className="nav-logo"></img>
        <h1 className="nav-title">BenchBae</h1>
      </Link>
    </div>
  );
};

export default Nav;
