import React from 'react'

const SearchInput = ({searchInput}) => {

    const changeSearchInput = (e) => {
        searchInput(e.target.value)
    }

    return ( 
        <>
            <input type="text" name="query" id="query" onChange={changeSearchInput} placeholder="Buscar" />
        </>
     );
}
 
export default SearchInput;