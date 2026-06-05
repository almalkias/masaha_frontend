import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import apiClient from '../../api/client';
import './ActivateAccount.css';


function ActivateAccount() {
    const { uid, token } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.post('auth/users/activation/', { uid, token });
                console.log(response, 'Account activated successfully');
            } catch (error) {
                console.error('Error activating account', error);
            }
        };
        fetchData();
    }, [uid, token]);

    return (
        <div className="activate-account">
            <h1>تم تفعيل الحساب </h1>
            <div><Link to='/login'>سجل الدخول</Link></div>
        </div>
    );
}

export default ActivateAccount;
