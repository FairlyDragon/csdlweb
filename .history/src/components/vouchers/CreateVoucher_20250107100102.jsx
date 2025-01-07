import React, { useState } from 'react';

const CreateVoucher = ({ onAddVoucher }) => {
    const [code, setCode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [discount, setDiscount] = useState('');
    const [minOrderAmount, setMinOrderAmount] = useState('');
    const [totalUsage, setTotalUsage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newVoucher = {
            code,
            start_date: startDate,
            end_date: endDate,
            discount_percentage: discount,
            minimum_order_amount: minOrderAmount,
            total_usage_limit: totalUsage,
        };
        onAddVoucher(newVoucher);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" required />
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount (%)" required />
            <input type="number" value={minOrderAmount} onChange={(e) => setMinOrderAmount(e.target.value)} placeholder="Minimum Order Amount" required />
            <input type="number" value={totalUsage} onChange={(e) => setTotalUsage(e.target.value)} placeholder="Total Usage" required />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateVoucher;
