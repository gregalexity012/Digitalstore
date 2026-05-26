export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);

    return res.status(200).json({
      success: true
    });
  }

  res.status(405).send('Method Not Allowed');
}