export default function removeMD(str: string): string {
	const htmlReplaceRegex = new RegExp('<[^>]*>', 'g');
	const normalString = str.replace(htmlReplaceRegex, '')
		.replace(/^[=\-]{2,}\s*$/g, '')
		.replace(/\[\^.+?\](\: .*?$)?/g, '')
		.replace(/\s{0,2}\[.*?\]: .*?$/g, '')
		.replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, '')
		.replace(/\[([^\]]*?)\][\[\(].*?[\]\)]/g, '$1')
		.replace(/^\s{0,3}>\s?/gm, '')
		.replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
		.replace(/^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} #{0,}(\n)?\s{0,}$/gm, '$1$2$3')
		.replace(/([\*]+)(\S)(.*?\S)??\1/g, '$2$3')
		.replace(/(^|\W)([_]+)(\S)(.*?\S)??\2($|\W)/g, '$1$3$4$5')
		.replace(/(`{3,})(.*?)\1/gm, '$2')
		.replace(/`(.+?)`/g, '$1')
		.replace(/~(.*?)~/g, '$1');
	return normalString;
}