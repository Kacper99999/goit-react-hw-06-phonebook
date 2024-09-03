import React from "react";
import PropTypes from "prop-types";


function Filter({ search }){
    return(
        <>
            <h1>Find contact by name</h1>
            <form className="form">
                <input onChange={search} type="text" />
            </form>
        </>
 )
}

Filter.propTypes = {
    search : PropTypes.func
}

export default Filter;