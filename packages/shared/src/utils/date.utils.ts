export const isValidTimeZone = (tz: string): boolean => {
	if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
		throw new Error("Time zones are not available in this environment");
	}

	try {
		Intl.DateTimeFormat(undefined, { timeZone: tz });
		return true;
	} catch (ex) {
		return false;
	}
};

export const isIsoDate = (str: string): boolean => {
	if (str.includes("T")) {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) return false;
	} else {
		if (!/\d{4}-\d{2}-\d{2}/.test(str)) return false;
	}
	const d = new Date(str);
	return (
		d instanceof Date &&
		!isNaN(d.getTime()) &&
		d.toISOString().startsWith(str)
	);
};
