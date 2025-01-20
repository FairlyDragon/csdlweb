
const VoucherExpired = ({ vouchers }) => {
  return (
    <div>
      <h2>Expired Vouchers</h2>
      {vouchers.map((voucher, index) => (
        <div key={index}>
          <p>
            {voucher.code} - {voucher.discount_percentage}% OFF
          </p>
          <p>Expired on {voucher.end_date}</p>
        </div>
      ))}
    </div>
  );
};

export default VoucherExpired;
