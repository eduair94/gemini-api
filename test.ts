import { gemini } from "./classes/Gemini";

async function main() {
    const response = await gemini.generateContentReq("probando, dime algo");
    console.log(response);
}

main();