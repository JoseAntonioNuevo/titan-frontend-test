import { describe, it, expect, beforeEach } from "vitest";
import { useCarouselStore } from "@/store/useCarouselStore";

describe("useCarouselStore", () => {
  beforeEach(() => {
    useCarouselStore.setState({ focusedIndex: 0, totalItems: 0 });
  });

  it("has correct initial state", () => {
    const state = useCarouselStore.getState();
    expect(state.focusedIndex).toBe(0);
    expect(state.totalItems).toBe(0);
  });

  it("sets total items correctly", () => {
    useCarouselStore.getState().setTotalItems(10);
    expect(useCarouselStore.getState().totalItems).toBe(10);
  });

  it("moveRight increments focusedIndex", () => {
    useCarouselStore.getState().setTotalItems(10);
    useCarouselStore.getState().moveRight();
    expect(useCarouselStore.getState().focusedIndex).toBe(1);
  });

  it("moveRight clamps at totalItems - 1", () => {
    useCarouselStore.getState().setTotalItems(5);
    useCarouselStore.setState({ focusedIndex: 4 });
    useCarouselStore.getState().moveRight();
    expect(useCarouselStore.getState().focusedIndex).toBe(4);
  });

  it("moveRight handles empty list", () => {
    useCarouselStore.getState().setTotalItems(0);
    useCarouselStore.getState().moveRight();
    expect(useCarouselStore.getState().focusedIndex).toBe(0);
  });

  it("moveLeft decrements focusedIndex", () => {
    useCarouselStore.getState().setTotalItems(10);
    useCarouselStore.setState({ focusedIndex: 5 });
    useCarouselStore.getState().moveLeft();
    expect(useCarouselStore.getState().focusedIndex).toBe(4);
  });

  it("moveLeft clamps at 0", () => {
    useCarouselStore.getState().setTotalItems(10);
    useCarouselStore.setState({ focusedIndex: 0 });
    useCarouselStore.getState().moveLeft();
    expect(useCarouselStore.getState().focusedIndex).toBe(0);
  });

  it("handles full navigation sequence", () => {
    const { setTotalItems, moveRight, moveLeft } = useCarouselStore.getState();

    setTotalItems(3);
    expect(useCarouselStore.getState().focusedIndex).toBe(0);

    moveRight();
    expect(useCarouselStore.getState().focusedIndex).toBe(1);

    moveRight();
    expect(useCarouselStore.getState().focusedIndex).toBe(2);

    moveRight();
    expect(useCarouselStore.getState().focusedIndex).toBe(2);

    moveLeft();
    expect(useCarouselStore.getState().focusedIndex).toBe(1);

    moveLeft();
    expect(useCarouselStore.getState().focusedIndex).toBe(0);

    moveLeft();
    expect(useCarouselStore.getState().focusedIndex).toBe(0);
  });
});
