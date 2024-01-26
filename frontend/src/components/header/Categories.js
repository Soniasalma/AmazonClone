import React, { useContext } from 'react';
import CatContext from '../../hooks/CatContext';
import { Link } from 'react-router-dom';

const Categories = ({ category }) => {
  const { setFilter, setSearch } = useContext(CatContext);

  const handleFilterCategory = (categoryName) => {
    //console.log(categoryName);
    setFilter(categoryName);
    setSearch('');
  };

  return (
    <li className="text-sm tracking-wide font-titleFont py-1 px-2  border-b-[1px] border-b-transparent hover:bg-gray-200 hover:rounded-md cursor-pointer duration-200">
      <Link to="/">
        <div
          className="whitespace-nowrap"
          onClick={() => handleFilterCategory(category.name)}
        >
          {category.name}
        </div>
      </Link>
    </li>
  );
};

export default Categories;
