export function mappingStylist(item) {
  return {
    id: item.stylistID,
    fullName: item.fullName,
    avatar: item.avatar,
    phone: item.phoneNumber,
    gender: item.gender,
    email: item.email,
    yob: item.yob,
    address: item.address,
    level: item.level,
    certificateURL: item.certificateURL,
    hireDate: item.hireDate,
    deleted: item.deleted,
    role: item.role,
    userId: item.userID,
  };
}

export function mappingStaff(item) {
  return {
    id: item.staffID,
    fullName: item.fullName,
    avatar: item.avatar,
    phone: item.phoneNumber,
    email: item.email,
    yob: item.yob,
    hireDate: item.hireDate,
    gender: item.gender,
    address: item.address,
    deleted: item.deleted,
    role: item.role,
    userId: item.userID,
  };
}

export function mappingService(item) {
  return {
    id: item.serviceID,
    serviceName: item.serviceName,
    serviceImg: item.img,
    price: item.price,
    duration: item.duration,
    description: item.description,
    deleted: item.deleted,
  };
}

export function mappingCustomer(item) {
  return {
    id: item.customerID,
    customerName: item.fullName,
    avatar: item.fullName,
    loyaltyPoints: item.loyaltyPoints,
    createdAt: item.createdAt,
    gender: item.gender,
    yob: item.yob,
    phone: item.phoneNumber,
    deleted: item.deleted,
  };
}

export function formatPriceToUSD(price) {
  // Handle undefined, null, or empty string cases upfront
  if (price === null || price === undefined || price === "") {
    return "0";
  }

  // Convert price to a number if it's a string
  let numericPrice;
  if (typeof price === "string") {
    // Remove any unwanted characters
    const cleanedPrice = price.replace(/[^0-9.-]+/g, "");
    numericPrice = parseFloat(cleanedPrice);
  } else if (typeof price === "number") {
    numericPrice = price;
  } else {
    return "0"; // If price is neither string nor number, return default
  }

  // Check if conversion succeeded
  if (isNaN(numericPrice)) {
    return "0";
  }

  // Format to string with commas, without currency sign
  return numericPrice.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
