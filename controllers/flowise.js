export const createPrediction = async (req, res) => {
  const { question, uploads } = req.body;
  console.log("Received question:", question);
  console.log("Received uploads:", uploads);

  try {
    if (!question || !uploads) {
      throw new Error("Invalid input: 'question' or 'uploads' is missing.");
    }

    const flowiseData = {
      question: question,
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

    // Update the condition to check if data contains the expected 'text' property
    if (!data || !data.text) {
      throw new Error("Error from Flowise API: " + (data.message || "Unknown error"));
    }

    res.status(200).json({ message: data });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
