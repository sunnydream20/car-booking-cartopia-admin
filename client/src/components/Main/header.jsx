import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
      };

    return (
        <nav className={styles.navbar}>
            <h1>Admin CarTopia</h1>
            <div>
            <Link to="/" className="nav-link">Category</Link>
            <Link to="/cars" className="nav-link">Cars</Link>
            <Link to="/homesliders" className="nav-link">HomeSlider</Link>
            <Link to="/homebanners" className="nav-link">HomeBanner</Link>
            <button className={styles.white_btn} onClick={handleLogout}>
                Logout
            </button>
            </div>
        </nav>
    )
}

export default Header;