import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,  
  });
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(msg){
    try{
    const res = await openai.createCompletion({
        model: 'gpt-3.5-turbo-instruct',
        prompt: msg,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0

    })
    return res.data.choices[0].text;
} catch (error) {
    if (error.response && error.response.status === 429) {
        console.error('Rate limit exceeded. Please try again later.');
        // Optionally, implement retry logic here
    } else {
        console.error('Error occurred:', error);
    }
}
} 