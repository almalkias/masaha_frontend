import search from "../../assets/images/search_icon.svg";
import React, { useState } from 'react';
import apiClient from '../../api/client';
import './Search.css';


function Search() {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await apiClient.get(`api/paints/?search=${query}`);
            // onSearch(response.data);
        } catch (error) {
            console.error('Search error', error);
        }
    };

    return (
        <div className="Search">
            <div className="input-container">
                <img
                    src={search}
                    className="search-icon"
                    alt=""
                />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="بحث"
                        disabled
                    />
                </form>
            </div>
        </div>
    )
}

export default Search;