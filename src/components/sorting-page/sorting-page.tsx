import styles from "./sorting-page.module.css";

import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, randomArr, selectionSort } from "./sorting-page.utils";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

export type TArr = {
	value: number;
	color: ElementStates;
}

type TSort = "selection" | "bubble";

export const SortingPage = () => {
	const [randomNums, setRandomNums] = useState<TArr[]>(randomArr());
	const [sortType, setSortType] = useState<TSort>("selection");
	const [sorting, setSorting] = useState<Direction>();
	const [loading, setLoading] = useState(false);

	const createRandomArr = () => {
		const newArr = randomArr();
		setRandomNums(newArr);
	}

	const sortedArrAscend = async (sorting: Direction) => {
		setSorting(sorting);
		if (sortType === "bubble") {
			setLoading(true);
			await bubbleSort(randomNums, Direction.Ascending, setRandomNums);
			setLoading(false);
		} else {
			setLoading(true);
			await selectionSort(randomNums, Direction.Ascending, setRandomNums);
			setLoading(false);
		}
	}

	const sortedArrDescend = async (sortin: Direction) => {
		setSorting(sorting);
		setLoading(true);
		if (sortType === "bubble") {
			await bubbleSort(randomNums, Direction.Descending, setRandomNums)
		} else {
			setLoading(true);
			selectionSort(randomNums, Direction.Descending, setRandomNums)
		}
		setLoading(false);
	}

	const setLoader = (direction: Direction) => {
		return sorting === direction && loading === true ? true : false;
	}

  return (
    <SolutionLayout title="Сортировка массива">
			<div className={styles.container}>
				<RadioInput
					label="Выбор"
					value={sortType}
					name="selection"
					checked={sortType === 'selection'}
					onChange={() => setSortType("selection")}
				/>
				<RadioInput
					label="Пузырек"
					extraClass={styles.radio}
					value={sortType}
					name="bubble"
					checked={sortType === 'bubble'}
					onChange={() => setSortType("bubble")}
				/>
				<Button
					text="По возрастанию"
					sorting={Direction.Ascending}
					onClick={() => sortedArrAscend(Direction.Ascending)}
					isLoader={setLoader(Direction.Ascending)}
					disabled={randomNums.length === 0 || setLoader(Direction.Descending)}
				/>
				<Button
					text="По убыванию"
					extraClass={styles.button}
					sorting={Direction.Descending}
					onClick={() => sortedArrDescend(Direction.Descending)}
					isLoader={setLoader(Direction.Descending)}
					disabled={randomNums.length === 0 || setLoader(Direction.Ascending)}
				/>
				<Button
					text="Новый массив"
					onClick={createRandomArr}
					disabled={setLoader(Direction.Descending) || setLoader(Direction.Ascending)}
				/>
			</div>
			<div className={styles.sorting}>
				{randomNums.length !== 0 &&
					randomNums.map((num, index) => (
						<Column index={num.value} key={index} state={num.color} />
					))}
			</div>
    </SolutionLayout>
  );
};
