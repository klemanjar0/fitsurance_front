import {configuredSocket} from "./configuredSocket";

export const authEmit = (id) => {
    configuredSocket.emit("SET_ID_SOCKET", {id});
}
