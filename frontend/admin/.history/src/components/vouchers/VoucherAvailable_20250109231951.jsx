import { useState, useEffect } from "react";
import { voucherService } from "../../services/VoucherService";

const VoucherAvailable = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await voucherService.getAvailableVouchers();
        setVouchers(data);
      } catch (error) {
        console.error("Error fetching available vouchers:", error);
      }
    };
    fetchVouchers();
  }, []);

  return (
    // ... render vouchers
  );
};

export default VoucherAvailable;
