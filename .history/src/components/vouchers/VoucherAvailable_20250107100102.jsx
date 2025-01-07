import React from 'react';

const VoucherAvailable = ({ vouchers }) => {
    return (
        <div>
            <h2>Available Vouchers</h2>
            {vouchers.map((voucher, index) => (
                <div key={index}>
                    <p>{voucher.code} - {voucher.discount_percentage}% OFF</p>
                    <p>Valid from {voucher.start_date} to {voucher.end_date}</p>
                </div>
            ))}
        </div>
    );
};

export default VoucherAvailable;
