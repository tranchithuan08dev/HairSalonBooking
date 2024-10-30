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
  // Check if price is defined and is a valid string
  if (!price || typeof price !== "string") {
    return "$0"; // Return a default value or handle it accordingly
  }

  // Remove any unwanted characters and convert to a number
  const cleanedPrice = price.replace(/[^0-9.-]+/g, "");
  const numericPrice = parseFloat(cleanedPrice);

  if (isNaN(numericPrice)) {
    return "$0"; // Return a default value or handle it accordingly
  }

  return numericPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
