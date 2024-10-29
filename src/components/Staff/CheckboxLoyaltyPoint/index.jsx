const CheckboxLoyaltyPoints = (props) => {
  const { loyaltyPoints, originalPrice, setDiscountPrice, setChecked, isPaid } =
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
      {isPaid === false ? (
        <>
          <input
            className="checkboxInput"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          <label className="checkboxLabel"> Use loyalty points</label>
          </>
      ) : null} 
    </div>
  );
  
};

export default CheckboxLoyaltyPoints;
