// paymentAPI.js
const initiatePayment = async (bookingId, amount) => {
  // Call to backend server to initiate the payment
  const response = await fetch(`/api/payment/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookingId, amount }),
  });
  return response.json(); // Handle the response accordingly
};

export { initiatePayment };
