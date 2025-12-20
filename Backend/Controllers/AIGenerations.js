import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

 export const ProductGenerationWithAI = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: "Product name is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",  
      messages: [
        {
          role: "system",
          content:
            "You are an expert ecommerce copywriter. Write clear, attractive product descriptions.",
        },
        {
          role: "user",
          content: `
Write a professional ecommerce product description.

Product name: ${name}

Rules:
- 3 to 4 sentences
- Clear and engaging
- Suitable for an online store
-if the user enters the numbers or any special keyword then just simply say plase tell me your product name 
-Here's a professional product description for the product name directly give the description dont start this Here's a professional product description  :

`,
        },
      ],
    });

    const description = completion.choices[0].message.content;

    res.json({
      success: true,
      description,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 

export const LoginPasswordGenerationWithAI = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a professional password generator. Your job is to generate strong, secure, and random passwords suitable for real-world use."
        },
        {
          role: "user",
          content: `
Generate a strong password using the user's name: ${name}.

Rules:
- Include the user's name at the start
- Append random numbers and special characters
- Total length: 12 to 16 characters
- Must include uppercase, lowercase, numbers, and special characters
- Do NOT include spaces
- Directly output the password only
- Do not add explanations or extra text
`
        }
      ],
    });

    const generatedPassword = completion.choices[0].message.content;

    res.json({ success: true, password: generatedPassword });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


 
