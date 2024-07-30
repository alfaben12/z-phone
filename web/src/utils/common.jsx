export function searchByKeyValueContains(data, key, value) {
  if (value == "") {
    return data;
  }

  return data.filter(
    (data) => data[key] && data[key].toLowerCase().includes(value.toLowerCase())
  );
}
