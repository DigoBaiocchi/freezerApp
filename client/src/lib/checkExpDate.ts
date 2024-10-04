function checkExpiration(inputDateString: string) {
  const currentDate = new Date();
  const inputDate = new Date(inputDateString);  // Convert the entered string into a Date object
  
  if (inputDate < currentDate) {
    return "Expired";
  }

  // Calculate time differences in milliseconds
  const timeDifference = inputDate.getTime() - currentDate.getTime();

  // Convert the time difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (daysDifference < 14) {
    return "Expires in less than 2 weeks";
  }

  if (daysDifference < 30) {
    return "Expires in less than one month";
  }

  // Calculate months difference
  const monthsDifference = (inputDate.getFullYear() - currentDate.getFullYear()) * 12 + (inputDate.getMonth() - currentDate.getMonth());

  return `Expires in ${monthsDifference} months`;
}