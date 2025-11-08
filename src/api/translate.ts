const HOST_NAME = process.env.API_HOST;
const API_KEY = process.env.API_KEY;

type TranslateResponse = {
    text: string;
}

export const apiTranslate = async (text: string) => {
    const requestBody = {
        text: text,
    };
    const response = await fetch(`https://${HOST_NAME}/translate`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(requestBody),
    })
    if (response.status !== 200) return null;

    const responseBody = await response.json() as TranslateResponse;
    return responseBody.text;
}
