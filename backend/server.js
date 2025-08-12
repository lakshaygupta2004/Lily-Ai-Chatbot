const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const main = require("./src/services/gemini");
// app.listen(3000, () => {
//     console.log("Server is running at : http://localhost:3000");
// })

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
 });
const chatHistory = [];
io.on("connection", (socket) => {
    console.log("user is connected...");
    socket.on("disconnect", () => {
        console.log("user disconnected !");
    });
    socket.on("ai-message", async (data) => {
        // console.log("User Prompt : ", data.prompt);
        chatHistory.push({
            role: "user",
            parts: [{ text: data.prompt }]
        });
        try {
            const response = await main(chatHistory);
            // console.log("AI Response : ", response);
            chatHistory.push({
                role: "model",
                parts: [{ text: response }]
            });
            // Emit the AI response back to the client
            socket.emit("ai-response", response);
        } catch (error) {
            console.error("Error generating AI response:", error);
        }

    })
});


httpServer.listen(3000, () => {
    console.log("Server is running at : http://localhost:3000 ");
});
