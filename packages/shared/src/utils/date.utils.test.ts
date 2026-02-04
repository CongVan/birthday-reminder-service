import { isIsoDate, isValidTimeZone } from "./date.utils";

describe("date.utils", () => {
	describe("isValidTimeZone", () => {
		it("validates timezones correctly", () => {
			expect(isValidTimeZone("America/New_York")).toBe(true);
			expect(isValidTimeZone("Europe/London")).toBe(true);
			expect(isValidTimeZone("UTC")).toBe(true);
			expect(isValidTimeZone("EST")).toBe(true);

			expect(isValidTimeZone("Invalid/Timezone")).toBe(false);
			expect(isValidTimeZone("")).toBe(false);
			expect(isValidTimeZone("FakeZone")).toBe(false);
		});
	});

	describe("isIsoDate", () => {
		it("validates ISO dates", () => {
			expect(isIsoDate("2026-01-01")).toBe(true);
			expect(isIsoDate("2000-12-31")).toBe(true);
			expect(isIsoDate("2026-01-01T00:00:00.000Z")).toBe(true);
		});

		it("rejects invalid dates", () => {
			expect(isIsoDate("2026-13-01")).toBe(false);
			expect(isIsoDate("2026-02-30")).toBe(false);
			expect(isIsoDate("1234567890")).toBe(false);
			expect(isIsoDate("")).toBe(false);
			expect(isIsoDate("01/01/2026")).toBe(false);
		});
	});
});
