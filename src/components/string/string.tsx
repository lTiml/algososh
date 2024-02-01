import React from "react";
import styles from "./string.module.css";

import { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { delay, swapFunc } from "../../services/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export type TArr = {
	value: string | number;
	color: ElementStates;
}

export const StringComponent = () => {
	const [string, setString] = useState("");
	const [arrLetter, setArrLetter] = useState<Array<TArr>>([]);
	const [loading, setLoading] = useState(false);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setString(e.target.value);
	}

	const invertArr = async (
		arr: TArr[] | [],
		setArr: React.Dispatch<React.SetStateAction<TArr[]>>
	) => {
		const mid = Math.ceil(arr.length / 2);

		for (let i = 0; i < mid; i++) {
			let j = arr.length - 1 - i;
			arr[i].color = arr[j].color = ElementStates.Changing;
			setArr([...arr]);
			await delay(DELAY_IN_MS);

			swapFunc(arr, i, j);

			arr[i].color = arr[j].color = ElementStates.Modified;
			setArr([...arr])
		}
	};

	const submitInput = async (e: React.FormEvent, string: string) => {
		e.preventDefault();
		setLoading(true);
		const arr = string
			.trim()
			.split("")
			.map(value => ({ value, color: ElementStates.Default }));
		setArrLetter([...arr]);
		await delay(DELAY_IN_MS);
		await invertArr(arr, setArrLetter);
		setLoading(false);
	};

  return (
    <SolutionLayout title="Строка">
			<form
				className={styles.input}
				onSubmit={(e: React.FormEvent) => submitInput(e, string)}
			>
				<Input value={string} onChange={onChange} isLimitText maxLength={11} />
				<Button type="submit" text="Развернуть" disabled={!string} isLoader={loading} />
			</form>
			<div className={styles.invertString}>
				{arrLetter &&
					arrLetter.map((letter, index) => (
						<div key={index}>
							<Circle letter={String(letter.value)} state={letter.color} />
						</div>
					))}
			</div>
    </SolutionLayout>
  );
};
