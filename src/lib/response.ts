export function hasError(obj: any): obj is { error: string } {
  return obj && typeof obj.error === 'string';
}

export function hasMessage(obj: any): obj is { message: string } {
  return obj && typeof obj.message === 'string';
}
