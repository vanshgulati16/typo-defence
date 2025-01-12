import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a JSON object for a typing game with exactly this structure:
    {
      "wave1": {
        "typos": ["teh", "kat", "dawg", "runn", "jamp", "typ", "pley"],
        "special": ["the", "cat", "dog", "run", "jump", "type", "play"]
      },
      "wave2": {
        "typos": ["befor", "thru", "reciev", "thier", "wether", "wich", "mispel"],
        "special": ["before", "through", "receive", "their", "whether", "which", "misspell"]
      }
    }

    Requirements for each wave:
    - wave1: 7 simple typo words (3-4 letters)
    - wave2: 7 medium typo words (4-5 letters)
    - wave3: 7 longer typo words (5-6 letters)
    - wave4: 7 complex typo words (6-7 letters)
    - wave5: 7 challenging typo words (7-8 letters)

    Return only the JSON object without any markdown formatting or additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up markdown formatting
    text = text.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      const words = JSON.parse(text);
      
      // Validate the structure
      const isValidStructure = ['wave1', 'wave2', 'wave3', 'wave4', 'wave5'].every(wave => 
        words[wave] && 
        Array.isArray(words[wave].typos) && 
        Array.isArray(words[wave].special) &&
        words[wave].typos.length === words[wave].special.length &&
        words[wave].typos.length === 7
      );

      if (!isValidStructure) {
        console.error('Invalid structure:', words);
        throw new Error('Invalid word list structure');
      }

      console.log('Successfully generated words:', words);
      return Response.json(words);
    } catch (parseError) {
      console.error('Error parsing generated content:', parseError);
      console.log('Raw content:', text);
      return Response.json({ error: 'Invalid response format' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error generating words:', error);
    return Response.json({ error: 'Failed to generate words' }, { status: 500 });
  }
} 