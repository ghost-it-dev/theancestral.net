export function hasError(obj: any): obj is { error: string } {
	return obj && typeof obj.error === 'string';
}