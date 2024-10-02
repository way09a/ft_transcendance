export function cleanup_Resources() {
    if (typeof ws !== 'undefined' && ws) {
        ws.close();
    }
}
