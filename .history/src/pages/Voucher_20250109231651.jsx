import { useState } from "react";
import { CreateVoucher, VoucherAvailable, VoucherExpired } from "../components/vouchers";

const Voucher = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleVoucherCreated = () => {
    setRefreshTrigger(prev => prev + 1); // Trigger refresh của danh sách voucher
  };

  return (
    <>
      <CreateVoucher onSuccess={handleVoucherCreated} />
      <VoucherAvailable key={`available-${refreshTrigger}`} />
      <VoucherExpired key={`expired-${refreshTrigger}`} />
    </>
  );
};

export default Voucher;
