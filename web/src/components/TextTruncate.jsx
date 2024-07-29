const TextTruncate = ({ text, size }) => {
  return text.length > size ? text.substring(0, size) + "..." : text;
};
export default TextTruncate;
