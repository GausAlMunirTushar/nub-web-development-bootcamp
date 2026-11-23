export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/" aria-label="CampusConnect home">
        <span className="brand-mark" aria-hidden="true">C</span>
        <span>CampusConnect</span>
      </a>
      <button className="profile-button" type="button" aria-label="Open profile">
        <span>AM</span>
      </button>
    </header>
  );
}
