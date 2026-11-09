import assert from "node:assert/strict";
import { test } from "node:test";
import { createLongPress } from "../src/utils/long-press.ts";

const contact = { pointerId: 1, clientX: 100, clientY: 200 };
function setup(t) {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const opened = t.mock.fn();
  const released = t.mock.fn();
  return {
    gesture: createLongPress(opened, { onRelease: released }),
    opened,
    released,
    tick: (ms) => t.mock.timers.tick(ms),
  };
}
test("opens at 500ms, stays open while held and closes on release", (t) => {
  const { gesture, opened, released, tick } = setup(t);
  gesture.start(contact);
  tick(499);
  assert.equal(opened.mock.callCount(), 0);
  tick(1);
  assert.equal(opened.mock.callCount(), 1);
  tick(60_000);
  assert.equal(released.mock.callCount(), 0);
  gesture.end(1);
  assert.equal(released.mock.callCount(), 1);
  assert.equal(gesture.active, false);
});
test("quick tap never opens or closes a preview", (t) => {
  const { gesture, opened, released, tick } = setup(t);
  gesture.start(contact);
  tick(100);
  gesture.end(1);
  tick(500);
  assert.equal(opened.mock.callCount(), 0);
  assert.equal(released.mock.callCount(), 0);
});
test("movement before opening cancels even when the finger returns", (t) => {
  const { gesture, opened, tick } = setup(t);
  gesture.start(contact);
  tick(200);
  gesture.move({ ...contact, clientY: 211 });
  gesture.move(contact);
  tick(500);
  assert.equal(opened.mock.callCount(), 0);
});
test("small finger jitter still opens", (t) => {
  const { gesture, opened, tick } = setup(t);
  gesture.start(contact);
  gesture.move({ ...contact, clientX: 103, clientY: 204 });
  tick(500);
  assert.equal(opened.mock.callCount(), 1);
});
test("movement after opening keeps preview open until original release", (t) => {
  const { gesture, released, tick } = setup(t);
  gesture.start(contact);
  tick(500);
  gesture.move({ ...contact, clientY: 500 });
  assert.equal(released.mock.callCount(), 0);
  gesture.end(1);
  assert.equal(released.mock.callCount(), 1);
});
test("a different pointer cannot move or release the active preview", (t) => {
  const { gesture, opened, released, tick } = setup(t);
  gesture.start(contact);
  gesture.move({ ...contact, pointerId: 2, clientY: 500 });
  tick(500);
  gesture.end(2);
  assert.equal(opened.mock.callCount(), 1);
  assert.equal(released.mock.callCount(), 0);
  gesture.end(1);
  assert.equal(released.mock.callCount(), 1);
});
test("cancellation closes an open preview exactly once", (t) => {
  const { gesture, released, tick } = setup(t);
  gesture.start(contact);
  tick(500);
  gesture.cancel();
  gesture.cancel();
  gesture.end(1);
  assert.equal(released.mock.callCount(), 1);
});
test("cancellation before opening never shows a preview", (t) => {
  const { gesture, opened, released, tick } = setup(t);
  gesture.start(contact);
  tick(300);
  gesture.cancel();
  tick(500);
  assert.equal(opened.mock.callCount(), 0);
  assert.equal(released.mock.callCount(), 0);
});
test("starting a new gesture closes the previous preview and waits again", (t) => {
  const { gesture, opened, released, tick } = setup(t);
  gesture.start(contact);
  tick(500);
  gesture.start({ ...contact, pointerId: 2 });
  assert.equal(released.mock.callCount(), 1);
  tick(499);
  assert.equal(opened.mock.callCount(), 1);
  tick(1);
  assert.equal(opened.mock.callCount(), 2);
});
