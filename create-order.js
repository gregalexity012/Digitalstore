export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { amount, title, productId } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const orderId =
      "ORD_" + Date.now() + "_" + Math.floor(Math.random() * 100000);

    const response = await fetch("https://pay.zapupi.com/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zap_key: process.env.ZAPUPI_KEY,
        order_id: orderId,
        amount: String(amount),
        remark: title || "DIGISTOREX Purchase",
        success_url: "YOUR_SUCCESS_URL",
        failed_url: "YOUR_FAILED_URL",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Server Error",
      message: err.message,
    });
  }
}
