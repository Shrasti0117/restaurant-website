import { useState } from "react";
import { sendBooking } from "../api/siteApi.js";

function BookingForm() {
  const [form, setForm] = useState({ name: "", phone: "", eventType: "Table Booking" });
  const [status, setStatus] = useState("");

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    setStatus("Sending...");

    try {
      const result = await sendBooking(form);
      setStatus(result.message);
      setForm({ name: "", phone: "", eventType: "Table Booking" });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <form className="booking-form" onSubmit={submitBooking}>
      <label>
        Name
        <input name="name" value={form.name} onChange={updateField} placeholder="Your name" required />
      </label>
      <label>
        Phone
        <input name="phone" value={form.phone} onChange={updateField} placeholder="Mobile number" required />
      </label>
      <label>
        Booking Type
        <select name="eventType" value={form.eventType} onChange={updateField}>
          <option>Table Booking</option>
          <option>Wedding</option>
          <option>Birthday Party</option>
          <option>Corporate Event</option>
        </select>
      </label>
      <button className="btn btn-primary" type="submit">
        <i className="fa-solid fa-paper-plane"></i>
        Send Enquiry
      </button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}

export default BookingForm;
