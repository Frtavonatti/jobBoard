const Footer = () => {
  return (
    <footer className="mt-24 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-4 w-full text-center md:mb-0 md:w-1/3 md:text-left">
            <h2 className="text-xl font-bold">JobBoard</h2>
            <p className="text-sm">Connecting talent with opportunity.</p>
          </div>
          <div className="mb-4 w-full text-center md:mb-0 md:w-1/3">
            <ul className="list-none">
              <li className="mx-2 inline-block">
                <a href="#" className="text-sm hover:underline">
                  Home
                </a>
              </li>
              <li className="mx-2 inline-block">
                <a href="#" className="text-sm hover:underline">
                  About
                </a>
              </li>
              <li className="mx-2 inline-block">
                <a href="#" className="text-sm hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full text-center md:w-1/3 md:text-right">
            {/* <p className="text-sm">&copy; 2025 JobBoard. All rights reserved.</p> */}
            <p className="text-sm font-bold">
              Made by{" "}
              <a
                href="https://github.com/Frtavonatti"
                className="text-violet-800 hover:underline"
              >
                frtavonatti
              </a>{" "}
              with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
