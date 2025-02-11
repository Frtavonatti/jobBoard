const Footer = () => {
  return (
    <footer className="mt-24 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold">JobBoard</h2>
            <p className="text-sm">Connecting talent with opportunity.</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <ul className="list-none">
              <li className="inline-block mx-2">
                <a href="#" className="text-sm hover:underline">Home</a>
              </li>
              <li className="inline-block mx-2">
                <a href="#" className="text-sm hover:underline">About</a>
              </li>
              <li className="inline-block mx-2">
                <a href="#" className="text-sm hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            {/* <p className="text-sm">&copy; 2025 JobBoard. All rights reserved.</p> */}
            <p className="text-sm font-bold">Made by <a href="https://github.com/Frtavonatti" className="hover:underline text-violet-800">frtavonatti</a> with <span role="img" aria-label="heart">❤️</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;