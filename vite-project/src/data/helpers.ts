const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;

const eventType = [
  { id: 1, value: "f2f", label: "f2f" },
  { id: 2, value: "online", label: "online" },
];

const formatDate = (dateString: string | undefined) => {
  const date = new Date(dateString);

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const day = date.getDate();

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = day + getDaySuffix(day);

  return formattedDate.replace(day, dayWithSuffix);
};

const formatDateTwo = (dateString: string | undefined) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return `${diffInDays} days ago`;
  }
};

const isDateInPast = (dateString: string | undefined): boolean => {
  const date = new Date(dateString);
  const now = new Date();

  return date < now;
};

const isUnder18 = (dateString: string | undefined): boolean => {
  const dateOfBirth = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - dateOfBirth.getTime();
  const diffInYears = Math.floor(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  );

  return diffInYears < 18;
};

export {
  PASSWORD_REGEX,
  eventType,
  formatDate,
  formatDateTwo,
  isDateInPast,
  isUnder18,
};
