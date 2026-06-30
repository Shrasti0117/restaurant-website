export const fetchSiteData = async () => {
  const response = await fetch("/api/site");

  if (!response.ok) {
    throw new Error("Unable to load site content.");
  }

  return response.json();
};

export const sendBooking = async (booking) => {
  const response = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Unable to send booking request.");
  }

  return payload;
};
