import * as React from 'react';
import { useState, useEffect } from 'react';

function ResponsiveAppBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">MEDGEN AI</div>
      <div className="links">
        <ul className="ulLinks">
          <li className="linkItem">Home</li>
          <li className="linkItem">Chat Bot</li>
          <li className="linkItem">Image Analysis</li>
          <li className="linkItem">Dataset Generation</li>
          <li className="linkItem">Connect with Doctor</li>
          <li className="linkItem">Connect with IOT</li>
        </ul>
      </div>
      <div className="userProfile">SS</div>
    </div>
  );
}
export default ResponsiveAppBar;
