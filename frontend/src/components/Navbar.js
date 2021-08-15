import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">New Blogs</Link>
        <Link to="/sample">Sample</Link>
      </div>
    </nav>
  );
};

export default Navbar;
