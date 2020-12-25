import React, {useState} from 'react';

const Collection = ({context, products}) => {
    const [type, setType] = useState(context.filteredType)

    const productTypes = []
    const types = []
    types.push(
        <option value="all" key="-1">
            Category
        </option>
    )
    products.map((t, i) => {
        let type = t.node.productType
        if (!productTypes.includes(type) && type.length > 0) {
            productTypes.push(type)
            types.push(
                <option key={i} value={type}>
                    {type}
                </option>
            )
        }
        return null
    })
    productTypes.sort()

    const handleFilterType = (value) =>{
        setType(value)
        context.updateFilterType(value)
      }
    return (
        <label htmlFor="filter" className="has-text-dark">
            <div className="field is-pulled-left">
                <div className="control">
                    <div className="select level-item">
                        <select
                            defaultvalues={type}
                            onBlur={e => handleFilterType(e.target.value)}
                            onChange={e => handleFilterType(e.target.value)}
                            id="filter"
                        >
                            {types}
                        </select>
                    </div>
                </div>
            </div>
        </label>
    );
};

export default Collection;