import React, { useState, useEffect } from 'react';
import CreateVoucher from '../components/vouchers/CreateVoucher';
import VoucherAvailable from '../components/vouchers/VoucherAvailable';
import VoucherExpired from '../components/vouchers/VoucherExpired';

const Voucher = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        // Load vouchers from local storage
        const storedVouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
        setVouchers(storedVouchers);
    }, []);

    const handleAddVoucher = (newVoucher) => {
        const updatedVouchers = [...vouchers, newVoucher];
        setVouchers(updatedVouchers);
        localStorage.setItem('vouchers', JSON.stringify(updatedVouchers));
        setShowCreateForm(false);
    };

    return (
        <div>
            <h1>Voucher</h1>
            <button onClick={() => setShowCreateForm(true)}>+ Add Voucher</button>
            {showCreateForm && <CreateVoucher onAddVoucher={handleAddVoucher} />}
            <VoucherAvailable vouchers={vouchers.filter(v => new Date(v.end_date) > new Date())} />
            <VoucherExpired vouchers={vouchers.filter(v => new Date(v.end_date) <= new Date())} />
        </div>
    );
};

export default Voucher;
