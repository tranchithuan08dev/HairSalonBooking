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
  };
}
