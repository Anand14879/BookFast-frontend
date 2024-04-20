import React from "react";


const HandleKhaltiPayment = async () => {
  const payload = {
    return_url: "http://127.0.0.1:3000/bookings",
    website_url: "http://127.0.0.1:3000/home",
    amount: 200000, // Amount in paisa
    purchase_order_id: "order123",
    purchase_order_name: "Product Name",
    customer_info: {
      name: "Anurag Anand",
      email: "anurag@gmail.com",
      phone: "9840016420",
    },
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Key test_secret_key_4f39c83197984a9ab58a9c7717a9d32c",
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      requestOptions
    );
    const data = await response.json(); // Convert response to JSON
    if (data && data.payment_url) {
      window.location.href = data.payment_url; // Redirect to Khalti payment page
    }
  } catch (error) {
    console.error("Payment initiation failed:", error);
  }

  // React components must return JSX, not asynchronous functions.
  return <div>Payment Processing...</div>;
};

export default HandleKhaltiPayment;
