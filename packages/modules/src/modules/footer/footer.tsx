
const Footer = () => {
  return (
    <footer className="container mx-auto border-t bg-white text-center text-sm text-gray-500 py-4">
      <p>
        &copy; {new Date().getFullYear()} My Blog. All rights reserved.
      </p>
    </footer>
  );
};

export { Footer };