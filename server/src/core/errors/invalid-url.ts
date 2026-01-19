export class InvalidUrlError extends Error {
	constructor(url: string) {
		super(`URL "${url}" is not a valid URL`);
		this.name = "InvalidUrlError";
	}
}
