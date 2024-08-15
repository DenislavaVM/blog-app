export function calculateReadingTime(text) {
  const wordsPerMinute = 200; 
  const words = text.split(" ").length; 
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}