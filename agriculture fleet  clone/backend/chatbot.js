const express = require("express");
const { WebSocketServer } = require("ws");

const app = express();
const PORT = 5000;

// Start Express server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// WebSocket Server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("🔗 New WebSocket connection");

    ws.on("message", (message) => {
        const userMessage = message.toString().toLowerCase();
        const botResponse = getBotResponse(userMessage);
        ws.send(botResponse);
    });

    ws.on("close", () => console.log("🔌 WebSocket disconnected"));
});

// Function to handle chatbot responses
function getBotResponse(message) {
    const responses = [
        { pattern: /best crop|what crop should i grow/, response: "The best crop depends on soil type and climate. Wheat and rice are popular choices." },
        { pattern: /fertilizer|which fertilizer should i use/, response: "Use nitrogen-rich fertilizers for leafy crops and phosphorus-rich for root crops." },
        { pattern: /weather|forecast/, response: "You can check the latest weather forecast on local meteorological websites." },
        { pattern: /pesticide|pest control/, response: "Neem oil and organic pesticides are great for eco-friendly pest control." },
        { pattern: /soil test|how to check soil quality/, response: "A soil test can be done using a pH meter or by sending a sample to a local agricultural center." },
        { pattern: /watering schedule|how often should i water/, response: "Watering depends on the crop. Most crops need watering every 2-3 days in dry seasons." },
        { pattern: /organic farming|how to grow organic crops/, response: "Avoid synthetic fertilizers and pesticides. Use compost and crop rotation for healthy soil." },
        { pattern: /market price|how much can i sell/, response: "Crop prices vary by region and demand. Check online agricultural markets for real-time prices." },
        { pattern: /compost|how to make compost/, response: "Compost is made by mixing organic waste like vegetable scraps and dry leaves. Let it decompose over time." },
        { pattern: /greenhouse|how to build a greenhouse/, response: "Greenhouses use transparent materials to trap heat. You can build one with plastic sheets and a wooden frame." },
        { pattern: /hydroponics|how does hydroponics work/, response: "Hydroponics is a soil-less farming method where plants get nutrients from water solutions." },
        { pattern: /drip irrigation|how does drip irrigation work/, response: "Drip irrigation delivers water directly to plant roots using small pipes, reducing waste." },
        { pattern: /government subsidy|are there any subsidies for farmers/, response: "Government subsidies vary by country. Check your agriculture ministry's website for details." },
        { pattern: /how to increase yield|crop production tips/, response: "Use high-quality seeds, proper irrigation, and balanced fertilizers for better yield." },
        { pattern: /livestock feed|best food for cattle/, response: "Cattle need a balanced diet of grass, grains, and minerals for healthy growth." },
        { pattern: /solar farming|can solar panels help farming/, response: "Yes, solar panels can power irrigation systems and reduce electricity costs for farms." },
        { pattern: /sustainable farming|how to farm sustainably/, response: "Use crop rotation, organic fertilizers, and water conservation methods to farm sustainably." },
        { pattern: /tractor|best tractor for small farm/, response: "Compact tractors like the John Deere 3032E are great for small farms." },
    ];

    for (let entry of responses) {
        if (entry.pattern.test(message)) {
            return entry.response;
        }
    }

    return "I don't understand that question. Can you rephrase it?";
}
