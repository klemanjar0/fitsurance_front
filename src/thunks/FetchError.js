export class FetchError extends Error {
    constructor({ status, message }) {
        super(message);
        this.status = status;
    }
}
