import assert from "node:assert/strict";
import { test } from "node:test";
import { getActiveFlashSales, getNextFlashPriceChange, isFlashSaleActive } from "../src/utils/flash-sale.ts";

const sale = {
  id: "spring-sale",
  title: "Spring Flash Sale",
  isActive: true,
  startsAt: "2026-10-19T09:00:00+07:00",
  endsAt: "2026-10-19T11:00:00+07:00",
};
const start = Date.parse(sale.startsAt);
const end = Date.parse(sale.endsAt);
const during = Date.parse("2026-10-19T10:00:00+07:00");

const scenarios = [
  ["does not announce an upcoming campaign", sale, start - 1, false],
  ["announces a campaign at its exact start", sale, start, true],
  ["announces a running campaign", sale, during, true],
  ["announces until just before the end", sale, end - 1, true],
  ["stops announcing at the exact end", sale, end, false],
  ["does not announce a disabled campaign", { ...sale, isActive: false }, during, false],
  ["does not announce an expired campaign kept visible", { ...sale, showAfterEnd: true }, end + 1, false],
  ["rejects a missing start", { ...sale, startsAt: undefined }, during, false],
  ["rejects a missing end", { ...sale, endsAt: undefined }, during, false],
  ["rejects an invalid start", { ...sale, startsAt: "invalid" }, during, false],
  ["rejects an invalid end", { ...sale, endsAt: "invalid" }, during, false],
  ["rejects a reversed time window", { ...sale, startsAt: sale.endsAt, endsAt: sale.startsAt }, during, false],
  ["rejects an empty time window", { ...sale, endsAt: sale.startsAt }, start, false],
  ["rejects an invalid current time", sale, NaN, false],
  ["compares equivalent timezone offsets correctly", { ...sale, startsAt: "2026-10-19T02:00:00Z", endsAt: "2026-10-19T04:00:00Z" }, during, true],
];

for (const [name, campaign, now, expected] of scenarios) {
  test(name, () => {
    assert.equal(isFlashSaleActive(campaign, now), expected);
  });
}

test("returns only running campaigns, preserving API order and input data", () => {
  const second = { ...sale, id: "second-sale" };
  const expired = { ...sale, id: "expired", endsAt: sale.startsAt, showAfterEnd: true };
  const upcoming = { ...sale, id: "upcoming", startsAt: sale.endsAt };
  const items = Object.freeze([
    Object.freeze(expired),
    Object.freeze(sale),
    Object.freeze({ ...sale, id: "disabled", isActive: false }),
    Object.freeze(upcoming),
    Object.freeze(second),
  ]);

  assert.deepEqual(getActiveFlashSales(items, during), [sale, second]);
  assert.equal(items.length, 5);
});

test("returns an empty list when no campaigns are supplied", () => {
  assert.deepEqual(getActiveFlashSales(undefined, during), []);
  assert.deepEqual(getActiveFlashSales([], during), []);
});

test("refreshes catalog prices at the next start or end of a displayed variant", () => {
  const variant = { flashPrice: 100, flashStartsAt: sale.startsAt, flashEndsAt: sale.endsAt };
  const overlapping = { ...variant, flashStartsAt: new Date(during).toISOString() };
  const products = [
    { variants: [{ ...variant, flashPrice: undefined }, variant] },
    { variants: [{ ...variant, flashEndsAt: "invalid" }] },
    { variants: [variant] },
    { variants: [overlapping] },
  ];
  assert.equal(getNextFlashPriceChange(products, start - 1), start);
  assert.equal(getNextFlashPriceChange(products, start), during);
  assert.equal(getNextFlashPriceChange(products, during), end);
  assert.equal(getNextFlashPriceChange(products, end), undefined);
});
