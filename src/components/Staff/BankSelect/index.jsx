import React, { useState } from "react";

const BankSelect = (props) => {
  const { isPaid, setBank } = props;
  const [selectedBank, setSelectedBank] = useState("");

  const banks = [
    { code: "ACB", name: "Ngân hàng Á Châu" },
    { code: "BACABANK", name: "Ngân hàng Bắc Á" },
    { code: "BIDV", name: "Ngân hàng BIDV" },
    { code: "VietinBank", name: "Ngân hàng Công Thương" },
    { code: "VCBC", name: "Ngân hàng Ngoại Thương" },
    { code: "SGB", name: "Ngân hàng Sài Gòn Thương Tín" },
    { code: "MBB", name: "Ngân hàng Quân Đội" },
    { code: "NCB", name: "Ngân hàng Quốc Dân" },
    { code: "VCB", name: "Ngân hàng Viet Capital Bank" },
    { code: "LPB", name: "Ngân hàng Bưu Điện Liên Việt" },
    { code: "DAB", name: "Ngân hàng Đông Á" },
    { code: "TCBS", name: "Ngân hàng Kỹ Thương Việt Nam" },
    { code: "OCB", name: "Ngân hàng Phương Đông" },
    { code: "SC", name: "Ngân hàng Standard Chartered" },
    { code: "HSBC", name: "Ngân hàng HSBC" },
    { code: "IVB", name: "Ngân hàng Indovina" },
    { code: "NAB", name: "Ngân hàng Nam Á" },
    { code: "SHB", name: "Ngân hàng Shinhan" },
    { code: "MSB", name: "Ngân hàng Maritime Bank" },
    { code: "FCB", name: "Ngân hàng First Commercial Bank" },
  ];

  const handleChange = (event) => {
    setSelectedBank(event.target.value);
    setBank(event.target.value);
  };

  return (
    <>
      {isPaid === false ? (
        <div>
          <label htmlFor="bank-select">Choose bank:</label>
          <select id="bank-select" value={selectedBank} onChange={handleChange}>
            <option value="">-- Choose bank --</option>
            {banks.map((bank) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BankSelect;
