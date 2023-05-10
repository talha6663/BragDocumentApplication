import { FaFile } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav>
            <div className="logo"><FaFile className="logo_icon" />BRAGBOX</div>
            <h3>Sign In</h3>
        </nav>
    );
};

export default Navbar;