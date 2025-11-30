const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("music", {
    onNowPlaying: (callback) => {
        const handler = (_, data) => callback(data);
        ipcRenderer.on("now-playing", handler);

        // ✅ allow renderer to clean up
        return () => {
            ipcRenderer.removeListener("now-playing", handler);
        };
    },

    pause: () => ipcRenderer.send("music-pause"),
    next: () => ipcRenderer.send("music-next"),
    previous: () => ipcRenderer.send("music-previous")
});
