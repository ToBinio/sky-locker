export default defineNuxtPlugin({
    name: "ws",
    async setup() {
        const isSecure = location.protocol === "https:";
        const url = (isSecure ? "wss://" : "ws://") + location.host + "/_ws";

        console.log("ws", "Connecting to", url, "...");
        let ws = new WebSocket(url);

        ws.addEventListener("message", (event) => {

            console.log(event.data);

            const {user = "system", message = ""} = event.data.startsWith("{")
                ? JSON.parse(event.data)
                : {message: event.data};
            console.log(
                user,
                typeof message === "string" ? message : JSON.stringify(message),
            );
        });

        await new Promise((resolve) => ws!.addEventListener("open", resolve));

        console.log("ws", "Connected!");

        return {
            provide: {
                ws
            }
        };
    }
})