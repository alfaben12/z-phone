import { LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE } from "../components/loops/loops_constant";

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

export function isNumeric(str) {
  // Regular expression to check if the string contains only digits
  const regex = /[^0-9]/;
  return regex.test(str);
}

export function isNonAlphaNumeric(str) {
  // Regular expression to test for non-alphanumeric characters
  const regex = /[^a-zA-Z0-9]/;
  return regex.test(str);
}

export function getLoopsProfile(citizenid) {
  if (citizenid == undefined) {
    return null;
  }
  const profile = localStorage.getItem(
    LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE + "-" + citizenid
  );
  if (profile) {
    const data = JSON.parse(profile);
    if (Array.isArray(data)) {
      return null;
    }

    return data;
  }

  return null;
}

export function convertFromKb(valueInKb) {
  if (valueInKb == NaN || valueInKb == undefined) {
    return "Calculating";
  }

  let value;
  let unit;

  if (valueInKb < 1000) {
    value = valueInKb;
    unit = "KB";
  } else if (valueInKb < 1000 * 1000) {
    value = valueInKb / 1000;
    unit = "MB";
  } else if (valueInKb < 1000 * 1000 * 1000) {
    value = valueInKb / (1000 * 1000);
    unit = "GB";
  } else {
    value = valueInKb / (1000 * 1000 * 1000);
    unit = "TB"; // Optionally, you can handle terabytes (TB) as well
  }

  return `${parseFloat(value).toFixed(2)}${unit}`;
}
