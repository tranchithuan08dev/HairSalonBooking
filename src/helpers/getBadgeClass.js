export const getBadgeClass = (status) => {
    switch (status) {
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