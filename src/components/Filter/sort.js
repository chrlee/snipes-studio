import React, { useState } from 'react';

const Sort = ({context}) => {
  const [sort, setSort] = useState(context.filteredSort)
  const sorts = []


  sorts.push(
    <>
      <option key={0} value="featured">
        Featured
        </option>
      <option key={1} value="A-Z">
        Alphabetic, A-Z
        </option>
      <option key={2} value="Z-A">
        Alphabetic, Z-A
        </option>
      <option key={3} value="low">
        Price, ↑
        </option>
      <option key={4} value="high">
        Price, ↓
        </option>
    </>
  )

  const handleFilterSort = (value) =>{
    setSort(value)
    context.updateFilterSort(value)
  }
  
  return (
    <label htmlFor="sortBy" className="has-text-dark">
      <div className="field">
        <div className="control">
          <div className="select level-item">
            <select
              defaultvalues={sort}
              onChange={e => handleFilterSort(e.target.value)}
              onBlur={e => handleFilterSort(e.target.value)}
              id="sortBy"
            >
              {sorts}
            </select>
          </div>
        </div>
      </div>
    </label>
  );
};

export default Sort;