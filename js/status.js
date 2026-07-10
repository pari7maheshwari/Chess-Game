const status = document.getElementById("status");

export function setStatus(message) {
    status.textContent = message;
}

export function clearStatus() {
    status.textContent = "";
}