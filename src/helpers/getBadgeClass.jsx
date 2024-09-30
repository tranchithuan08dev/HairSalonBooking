export const getBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";
      case "Confirmed":
        return "bg-primary";
      case "Rejected":
        return "bg-danger";
      case "In-progress":
        return "bg-info";
      case "Completed":
        return "bg-success";
      case "Cancelled":
        return "bg-secondary";
      default:
        return "bg-light";
    }
};