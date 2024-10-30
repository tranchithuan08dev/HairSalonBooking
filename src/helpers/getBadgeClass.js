export const getBadgeClass = (status) => {
  switch (status) {
    case "In-progress":
      return "bg-primary";
    case "Completed":
      return "bg-success";
    case "Cancelled":
      return "bg-secondary";
      case "Done":
        return "bg-warning";
    default:
      return "bg-light";
  }
};
