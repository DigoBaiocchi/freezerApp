export function checkExpiration(inputDateString: string) {
  const currentDate = new Date();
  const inputDate = new Date(inputDateString);  // Convert the entered string into a Date object
  
  if (inputDate < currentDate) {
    return "Expired";
  }

  // Calculate time differences in milliseconds
  const timeDifference = inputDate.getTime() - currentDate.getTime();

  // Convert the time difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (daysDifference < 30) {
    return `Exp in ${daysDifference} days`;
  }

  // Calculate months difference
  const monthsDifference = (inputDate.getFullYear() - currentDate.getFullYear()) * 12 + (inputDate.getMonth() - currentDate.getMonth());

  return `Exp in ${monthsDifference} months`;
}