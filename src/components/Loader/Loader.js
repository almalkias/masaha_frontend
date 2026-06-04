import React from "react";
import { useLoading } from "../contexts/LoadingContext";
import { ReactComponent as MasahaLogo } from '../../assets/images/masaha-logo.svg';
import './Loader.css';

const Loader = () => {
    const { isLoading } = useLoading();

    return (
        <>
            {isLoading && (
                <div className="loader-container">
                    <div className="logo-icon">
                        <MasahaLogo />
                    </div>
                </div>
            )}
        </>
    );
};

export default Loader;
