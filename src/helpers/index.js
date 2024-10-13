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
