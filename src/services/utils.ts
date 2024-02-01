import { TArr } from "../components/string/string";

export const swapFunc = (arr: TArr[], firstInd: number, secondInd: number) => {
	const temp = arr[firstInd];
	arr[firstInd] = arr[secondInd];
	arr[secondInd] = temp;
	return arr;
}

export const delay = (time: number) => {
	return new Promise(resolve => setTimeout(resolve, time));
}