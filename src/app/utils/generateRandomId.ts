export const generateRandomId = () => {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // Add a time-based component to the string
  const timestampComponent = new Date().getTime().toString(36).toUpperCase();

  let result = timestampComponent;

  // Add the remaining random characters
  for (let i = timestampComponent.length; i < 15; i++) {
    result += characters
      .charAt(Math.floor(Math.random() * characters.length))
      .toUpperCase();
  }

  return result;
};
