export const createPrediction = async (req, res) => {
  const { uploads } = req.body;
  console.log("Received uploads:", uploads);

  try {
    if (!uploads) {
      throw new Error("Invalid input: 'uploads' is missing.");
    }

    const flowiseData = {
      question: "", // Placeholder or remove if the API can handle requests without it
      uploads: uploads,
    };

    console.log("Sending to Flowise API:", JSON.stringify(flowiseData, null, 2));

    const response = await fetch(`https://flowise-xmzl.onrender.com/api/v1/prediction/${process.env.FLOW_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flowiseData),
    });

    const data = await response.json();
    console.log("Flowise API response:", data);

    if (!data || !data.text) {
      throw new Error("Error from Flowise API: " + (data.message || "Unknown error"));
    }

    res.status(200).json({ message: data });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
