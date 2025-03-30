
import 'dotenv/config';
export default {
    name: "Campin' Cookin'",

    extra: {
        geminiApiKey: process.env.GEMINI_API_KEY || null,
    },
};

