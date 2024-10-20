import appConfig from "config/appConfig";
import { IGenerateText, IGenerateTextResponse } from "types/contentGenerationTypes";

export const generateText = async (
    generateText: IGenerateText
): Promise<IGenerateTextResponse> => {
    const headers = new Headers({
        "Content-Type": "application/json",
    });

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(generateText),
    };

    const endpoint = `${appConfig.apiUri}/v1/generate/text`;

    try {
        const response = await fetch(endpoint, options);
        const generatedText = (await response.json()) as IGenerateTextResponse;
        return generatedText;
    } catch (error) {
        console.error("Failed to generate text:", error);
        throw error;
    }
};