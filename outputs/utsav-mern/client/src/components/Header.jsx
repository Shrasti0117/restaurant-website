import { useEffect, useState } from "react";

const links = [
  ["About", "about"],
  ["Menu", "menu"],
  ["Banquet", "banquet"],
  ["Gallery", "gallery"],
  ["Reviews", "reviews"],
  ["Contact", "contact"]
];

function Header({ business }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <a href="#home" className="brand" aria-label="Utsav home">
          <span className="brand-mark">U</span>
          <span>
            <strong>Utsav</strong>
            <small>Restaurant & Banquet</small>
          </span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {links.map(([label, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setIsOpen(false)}>
              {label}
            </a>
          ))}
        </div>

        <a className="nav-cta" href={`tel:${business.tel}`}>
          <i className="fa-solid fa-phone"></i>
          Call Now
        </a>
      </nav>
    </header>
  );
}

export default Header;
