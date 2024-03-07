import { TArr } from "./string";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../services/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { swapFunc } from "../../services/utils";

export const reverseArr = async (
	arr: TArr[] | [],
	setArr: React.Dispatch<React.SetStateAction<TArr[]>>
) => {
	const mid = Math.ceil(arr.length / 2);
	const newArr = [...arr];

	for (let i = 0; i < mid; i++) {
		let j = arr.length - 1 - i;
		newArr[i].color = newArr[j].color = ElementStates.Changing;
		setArr([...newArr]);
		await delay(DELAY_IN_MS);
		swapFunc(newArr, i, j);
		newArr[i].color = newArr[j].color = ElementStates.Modified
		setArr([...newArr])
	}
	return newArr
}