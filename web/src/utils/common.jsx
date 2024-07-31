export function searchByKeyValueContains(data, key, value) {
  if (value == "") {
    return data;
  }

  return data.filter(
    (data) => data[key] && data[key].toLowerCase().includes(value.toLowerCase())
  );
}

export function currencyFormat(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
