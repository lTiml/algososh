import { bubbleSort, selectionSort, randomNum } from "./sorting-page.utils";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const arr = [9, 3, 8, 4, 6, 5].map(value => ({ value, color: ElementStates.Default}));
const sortedArrAsc = [3, 4, 5, 6, 8, 9].map(value => ({ value, color: ElementStates.Modified}));
const sortedArrDesc = [9, 8, 6, 5, 4, 3].map(value => ({ value, color: ElementStates.Modified}));

jest.setTimeout(30000);
const setArr = jest.fn();

describe("Algorithm sorting", () => {
	it("correct bubble sorting of empty array", async () => {
		await bubbleSort([], Direction.Ascending, setArr);
		expect(setArr).toBeCalledTimes(0);
	})
	it("correct bubble ascendsorting of array", async () => {
		await bubbleSort(arr, Direction.Ascending, setArr);
		expect(setArr).toHaveBeenLastCalledWith(sortedArrAsc);
	})
	it("correct bubble desc sorting of array", async () => {
		await bubbleSort(arr, Direction.Descending, setArr);
		expect(setArr).toHaveBeenLastCalledWith(sortedArrDesc)
	})
	it("correct bubble sorting of array with 1 element", async () => {
		await bubbleSort([{ value: 1, color: ElementStates.Modified }], Direction.Ascending, setArr);
		expect(setArr).toBeCalledTimes(0);
	})
	it("correct selection sorting of empty array", async () => {
		await selectionSort([], Direction.Ascending, setArr);
		expect(setArr).toBeCalledTimes(0);
	})
	it("correct selection ascend sorting of array", async () => {
		await selectionSort(arr, Direction.Ascending, setArr);
		expect(setArr).toHaveBeenLastCalledWith(sortedArrAsc)
	})
	it("correct selection desc sorting of array", async () => {
		await selectionSort(arr, Direction.Descending, setArr);
		expect(setArr).toHaveBeenLastCalledWith(sortedArrDesc)
	})
	it("correct selection sorting of array with 1 element", async () => {
		await selectionSort([{ value: 1, color: ElementStates.Modified }], Direction.Ascending, setArr);
		expect(setArr).toBeCalledTimes(0);
	})
})