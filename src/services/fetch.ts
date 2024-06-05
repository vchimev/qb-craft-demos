import { FieldForm } from "../types";

export async function post(url: string, requestData: FieldForm) {
    try {
        const response = await fetch(url, {
            body: JSON.stringify(requestData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log("Response:", responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}
