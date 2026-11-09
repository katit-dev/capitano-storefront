import assert from "node:assert/strict";
import { test } from "node:test";
import { createFlashSaleSession } from "../src/utils/flash-sale-session.ts";

function storage(initial) {
  const values = new Map();
  let writes = 0;
  return {
    getItem: key => values.has(key) ? values.get(key) : initial ?? null,
    setItem: (key, value) => { writes += 1; values.set(key, value); },
    get writes() { return writes; },
  };
}

test("a new campaign has not been seen", () => {
  assert.equal(createFlashSaleSession("paxmoly", storage()).hasSeen("spring"), false);
});

test("refreshing a tab restores all campaigns already shown together", () => {
  const tab = storage();
  createFlashSaleSession("paxmoly", tab).markSeen(["spring", "summer"]);
  const refreshed = createFlashSaleSession("paxmoly", tab);
  assert.equal(refreshed.hasSeen("spring"), true);
  assert.equal(refreshed.hasSeen("summer"), true);
  assert.equal(refreshed.hasSeen("new-campaign"), false);
});

test("independent tabs do not share their seen campaigns", () => {
  const firstTab = createFlashSaleSession("paxmoly", storage());
  const secondTab = createFlashSaleSession("paxmoly", storage());
  firstTab.markSeen(["spring"]);
  assert.equal(firstTab.hasSeen("spring"), true);
  assert.equal(secondTab.hasSeen("spring"), false);
});

test("sites sharing an origin keep separate campaign history", () => {
  const tab = storage();
  createFlashSaleSession("paxmoly", tab).markSeen(["spring"]);
  assert.equal(createFlashSaleSession("another-site", tab).hasSeen("spring"), false);
});

test("repeated callbacks do not rewrite history or lose previous campaigns", () => {
  const tab = storage();
  const session = createFlashSaleSession("paxmoly", tab);
  session.markSeen(["spring", "spring"]);
  session.markSeen(["spring"]);
  session.markSeen([]);
  assert.equal(tab.writes, 1);
  session.markSeen(["summer"]);
  const refreshed = createFlashSaleSession("paxmoly", tab);
  assert.equal(refreshed.hasSeen("spring"), true);
  assert.equal(refreshed.hasSeen("summer"), true);
});

for (const initial of ["invalid json", "null", "{}", "123"]) {
  test(`invalid saved history (${initial}) does not prevent new announcements`, () => {
    const session = createFlashSaleSession("paxmoly", storage(initial));
    assert.equal(session.hasSeen("spring"), false);
    session.markSeen(["spring"]);
    assert.equal(session.hasSeen("spring"), true);
  });
}

test("invalid entries in history are ignored while valid campaign IDs remain", () => {
  const session = createFlashSaleSession("paxmoly", storage('["spring",null,123,"",{}]'));
  assert.equal(session.hasSeen("spring"), true);
  assert.equal(session.hasSeen(""), false);
});

test("blocked browser storage falls back to memory", () => {
  const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  const session = createFlashSaleSession("paxmoly", blocked);
  session.markSeen(["spring", "summer"]);
  assert.equal(session.hasSeen("spring"), true);
  assert.equal(session.hasSeen("summer"), true);
});

test("the session helper can be used without browser storage", () => {
  const session = createFlashSaleSession();
  session.markSeen(["spring"]);
  assert.equal(session.hasSeen("spring"), true);
});
