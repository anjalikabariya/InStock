// import any necessary modules
import React from 'react';
import {Link} from 'react-router-dom';

// import necessary styling 
import "./CardTitle.scss";

/**
 * Useage: Reusable title component that conditionally renders the correct contents of a card title
 * @param {string} title
 * @param {boolean} img - whether or not to render <- icon 
 * @param {boolean} search - whether or not to render the search input box
 * @param {boolean} button - whether or not to render a button
 * @param {string} buttonText
 * @param {string} buttonImg - string for url to edit icon
 * @param {function} imgClickHandler - onClick function for <- icon
 * @param {function} buttonClickHandler - onClick function for button
 *  
 */

function CardTitle({title, img, search, pathForAddForm, pathForBackButton, button, buttonText, buttonImg, buttonLink, details, handleSearch}) {
    
    // determines if the left and right divs should be in a row on mobile for edit buttons
    const cardDivClass = (button && buttonImg!=="") && "card-title--flexed"; 

    
    //passes user input value on keyup event from search bar to handleSearch function on main page.
    const searchResults = (e) => {
        let searchInput = e.target.value;
        console.log(searchInput)
        handleSearch(searchInput);  
    }

    return (
       <div className={`card-title ${cardDivClass}`}>
            <div className="card-title__left">
                {img && 
                     <Link to={pathForBackButton}>
                        <img className="card-title__left-img" src="/assets/icons/arrow_back-24px.svg" alt="back arrow"/>
                    </Link>
                }
                <h1 className="card-title__left-title">{title}</h1>
            </div>
            <div className="card-title__right">
                
                {search && 
                    <div className="search__input">
                        <img className="search__input-icon" src="/assets/icons/search-24px.svg" alt="magnifying glass"/>
                        <input className="search__input-text"type="search" placeholder="Search.." onKeyUp={searchResults} id="searchBar" name="searchBar"></input>
                    </div>}

                {title && (title === "Warehouses" || title === "Inventory") &&
                    <Link to={pathForAddForm}>
                        <button className="card-title__button card-title__button--noImg">{buttonText}
                        </button>
                    </Link>}
                
                {/* if there is a button with an image then add the button text as a <p> so that it can be hidden for mobile */}
                {button && buttonImg!=="" && 
                    <Link to={buttonLink}> 
                        <button className="card-title__button card-title__button--img">
                            <img className="card-title__button-img" src={buttonImg} alt="edit icon"/>
                            <p className="card-title__button-text">{buttonText}</p>
                        </button>
                    </Link>}
            </div>
        </div>
    )
}

export default CardTitle
