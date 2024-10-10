export function mappingStylist(item) {
  return {
    id: item.stylistID,
    fullName: item.fullName,
    avatar: item.avatar,
    email: item.email,
    yob: item.yob, // Year of birth
    address: item.address,
    level: item.level,
    certificateURL: item.certificateURL,
    hireDate: item.hireDate,
    deleted: item.deleted,
  };
}
