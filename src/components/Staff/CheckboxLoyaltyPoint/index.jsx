const CheckboxLoyaltyPoints = (props) => {
  const { loyaltyPoints, originalPrice, setDiscountPrice, setChecked, checked } =
    props;

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    console.log(isChecked);
    if (isChecked) {
      setDiscountPrice(originalPrice - loyaltyPoints);
    } else {
      setDiscountPrice(originalPrice);
    }
  };

  return (
    <div className="checkboxPoints">
        <>
          <input
            className="checkboxInput"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={checked}
          />
          <label className="checkboxLabel"> Use loyalty points</label>
        </>
    </div>
  );
};

export default CheckboxLoyaltyPoints;
