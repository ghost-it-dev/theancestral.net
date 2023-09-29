interface AgentInfo {
	platform: string | null | "unknown";
	browser: string | null | "unknown";
}

function getAgentInfo(userAgent: string): AgentInfo {
	const info: AgentInfo = {
		platform: "unknown",
		browser: "unknown"
	};

	const ua = userAgent.toLowerCase();

	if (ua.includes('windows')) {
		info.platform = 'Windows';
	} else if (ua.includes('macintosh')) {
		info.platform = 'Mac';
	} else if (ua.includes('iphone')) {
		info.platform = 'iPhone';
	} else if (ua.includes('android')) {
		info.platform = 'Android';
	}

	if (ua.includes('chrome')) {
		info.browser = 'Chrome';
	} else if (ua.includes('safari')) {
		info.browser = 'Safari';
	} else if (ua.includes('firefox')) {
		info.browser = 'Firefox';
	}

	return info;
}

export default getAgentInfo;