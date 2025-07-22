import { useState } from 'react';

type categories = 'time' | 'count';

type testCategories = {
  category: categories;
  options: {
    length: number;
    label: string;
  }[];
};

type TypeTestNavbarProps = {
  categories: testCategories[];
  onOptionSelect: (
    category: categories,
    option: {
      length: number;
      label: string;
    }
  ) => void;
};

export const TypeTestNavbar = ({
  categories,
  onOptionSelect,
}: TypeTestNavbarProps) => {
  const defaultCategory =
    categories.find((c) => c.category === 'time')?.category ||
    categories[0]?.category;
  const defaultOption =
    categories.find((c) => c.category === defaultCategory)?.options[0]
      ?.length || 0;

  const [activeCategory, setActiveCategory] =
    useState<categories>(defaultCategory);
  const [activeOption, setActiveOption] = useState<number>(defaultOption);

  const currentCategory = categories.find((c) => c.category === activeCategory);

  return (
    <div className="mx-auto flex justify-center w-[60vw]">
      <div className="inline-block space-x-4">
        {categories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => {
              const defaultOption = cat.options[0];

              setActiveCategory(cat.category);
              setActiveOption(defaultOption.length);
              onOptionSelect(cat.category, defaultOption);
            }}
            className={`px-4 py-2 rounded-md text-sm mr-3 font-medium ${
              activeCategory === cat.category
                ? 'bg-dark-gray text-bright-gray'
                : 'text-sage-gray hover:bg-gray-700 hover:text-bright-gray'
            }`}
          >
            {cat.category.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="inline-block">
        {currentCategory?.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => {
              setActiveOption(opt.length);
              onOptionSelect(activeCategory, opt);
            }}
            className={` px-3  py-2 rounded-md mr-3 transition
                ${
                  activeOption === opt.length
                    ? 'bg-dark-gray text-bright-gray'
                    : 'text-sage-gray hover:bg-gray-700 hover:text-bright-gray'
                } `}
          >
            {opt.length}
            {currentCategory.category === 'time' ? 's' : ''}
          </button>
        ))}
      </div>
    </div>
  );
};
