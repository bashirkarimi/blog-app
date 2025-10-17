const Footer = () => {
  return (
    <footer className="container mx-auto border-t bg-white py-4 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
    </footer>
  );
};

export { Footer };
