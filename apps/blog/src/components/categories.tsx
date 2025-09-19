const Categories = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: { title: string; count: number }[];
}) => {
  const activeCategory = selectedCategory;

  return (
    <div className="py-4">
      <h2 className="sr-only">Categories</h2>
      <ul className="flex flex-wrap gap-2 ">
        <li>
          <button
            onClick={() => setSelectedCategory("")}
            value="All"
            disabled={activeCategory === ""}
            aria-current={activeCategory === "All" ? "true" : undefined}
            className={`text-sm font-medium mr-2 px-3 py-1 rounded-full transition-colors hover:cursor-pointer ${
              activeCategory === ""
                ? "bg-blue-800 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            All
          </button>
        </li>

        {categories &&
          categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => setSelectedCategory(category.title)}
                value={category.title}
                disabled={activeCategory === category.title}
                aria-current={
                  activeCategory === category.title ? "true" : undefined
                }
                className={`text-sm font-medium mr-2 px-3 py-1 rounded-full transition-colors hover:cursor-pointer ${
                  activeCategory === category.title
                    ? "bg-blue-800 text-white"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                {category.title}
                {category.count > 1 && (
                  <span
                    className={`rounded-full px-1 text-xs ml-1 ${
                      activeCategory === category.title
                        ? "bg-white text-blue-800"
                        : "text-gray-500 border border-gray-500"
                    }`}
                  >
                    {category.count}
                  </span>
                )}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Categories };
