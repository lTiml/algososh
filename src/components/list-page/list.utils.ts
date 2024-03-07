import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { delay } from "../../services/utils"
import { ElementStates } from "../../types/element-states"
import { TList } from "./list-page"

export type TButton = "addToHead" | "addToTail" | "addAtIndex" | "deleteAtIndex" | "deleteTail" | "deleteHead"

export const Buttons = {
	addToHead: "addToHead",
	addToTail: "addToTail",
	addAtIndex: "addAtIndex",
	deleteAtIndex: "deleteAtIndex",
	deleteTail: "deleteTail",
	deleteHead: "deleteHead",
}

export const disabledButton = (name: TButton | string, current: TButton | string) => {
	return name !== current ? true : false
}
export const headList = (index: number) => {
	return index === 0 ? "head" : null;
}
export const tailList = (index: number, arr: TList[]) => {
	return index === arr.length - 1 ? "tail" : null;
}

export const addToArr = async (
	index: number,
	arr: TList[],
	setListArr: React.Dispatch<React.SetStateAction<TList[]>>,
	setInputValue: React.Dispatch<React.SetStateAction<string>>,
	setIndexValue: React.Dispatch<React.SetStateAction<string>>,
) => {
	await delay(SHORT_DELAY_IN_MS);
	if (arr.length > 0) {
		if (arr[index]) {
			arr[index].color = ElementStates.Modified;
		}
		setListArr(arr);
		await delay(SHORT_DELAY_IN_MS);
		if (arr[index]) arr[index].color =ElementStates.Default;
		setListArr(arr);
		setInputValue("");
		setIndexValue("");
	}
};

export const findIndex = async (
	index: number,
	arr: TList[],
	setArr: React.Dispatch<React.SetStateAction<TList[]>>,
	setInputIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
	action: "delete" | "add",
) => {
	for (let i = 0; action === "delete" ? i < Number(index) : i <= Number(index); i++) {
		setInputIndex(i);
		await delay(SHORT_DELAY_IN_MS);
		arr[i].color = ElementStates.Changing;
		setArr([...arr]);
	}
}
