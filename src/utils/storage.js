export function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function setCurrentUser(phone) {
  localStorage.setItem("sr_current_user", phone);
}

export function getCurrentUser() {
  return localStorage.getItem("sr_current_user") || "";
}

export function clearCurrentUser() {
  localStorage.removeItem("sr_current_user");
}

export function setPage(page) {
  localStorage.setItem("sr_current_page", page);
}

export function getPage() {
  return localStorage.getItem("sr_current_page") || "login";
}

export function money(amount) {
  return "৳" + Number(amount || 0).toFixed(2);
}
