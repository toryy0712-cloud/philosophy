export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: { message: 'POST 요청만 허용됩니다.' } });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY || 'sk-d8442a04bb634ba48014fa1f681af04b';
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

    try {
        const { messages, model } = req.body;

        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model || 'deepseek-reasoner',
                messages: messages,
                max_tokens: 2048
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: { message: error.message } });
    }
}