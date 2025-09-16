import Link from "next/link";

const NavigateHome = () => (
  <Link
    href="/"
    aria-label="Back to Blog"
    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 mb-8 hover:cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Back to Blog
  </Link>
);

export { NavigateHome };
