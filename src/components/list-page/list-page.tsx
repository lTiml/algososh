import styles from "./list.module.css";

import { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./linked-list";
import { randomNum } from "../sorting-page/sorting-page.utils";
import { Buttons, TButton, addToArr, disabledButton, findIndex, headList, tailList } from "./list.utils";
import { delay } from "../../services/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export type TList = {
	value: string;
	color: ElementStates;
}

const NewLinkedList = new LinkedList<string> (
	Array.from({ length: 6}, () => randomNum(0, 99).toString())
);

export const ListPage = () => {
	const [loading, setLoading] = useState(false);
	const [loader, setLoader] = useState({
		addToHead: false,
		addToTail: false,
		addAtIndex: false,
		deleteAtIndex: false,
		deleteTail: false,
		deleteHead: false,
	})
	const [inputValue, setInputValue] = useState("");
	const [indexValue, setIndexValue] = useState("");
	const [listArray, setListArray] = useState<TList[]>(NewLinkedList.makeArray());
	const [inputIndex, setInputIndex] = useState<number>();
	const [deletedValue, setDeletedValue] = useState("");
	const [addTo, setAddTo] = useState({
		addToHead: false,
		addToTail: false,
		addToIndex: false,
		deleteTail: false,
		deleteHead: false,
		deleteIndex: false,
	});
	const [currButton, setCurrButton] = useState<TButton | string>("");

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	}
	const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
		setIndexValue(e.target.value);
	}

	const addToHead = async () => {
		if (inputValue && NewLinkedList.size < 6) {
			setLoading(true);
			setLoader({ ...loader, addToHead: true });
			setCurrButton(Buttons.addToHead);
			setInputIndex(0);
			setAddTo({ ...addTo, addToHead: true });
			await delay(SHORT_DELAY_IN_MS);
			NewLinkedList.prepend(inputValue);
			setAddTo({ ...addTo, addToHead: false });
			const arr = NewLinkedList.makeArray();
			await addToArr(0, arr, setListArray, setInputValue, setIndexValue);
			setLoader({ ...loader, addToHead: false });
			setCurrButton("");
			setLoading(false);
		}
	};
	const addToTail = async () => {
		if (inputValue && NewLinkedList.size < 6) {
			setLoading(true);
			setLoader({ ...loader, addToTail: true });
			setCurrButton(Buttons.addToTail);
			setInputIndex(listArray.length - 1);
			setAddTo({ ...addTo, addToTail: true });
			await delay(SHORT_DELAY_IN_MS);
			NewLinkedList.append(inputValue);
			setAddTo({ ...addTo, addToTail: false });
			const arr = NewLinkedList.makeArray();
			await addToArr(arr.length - 1, arr, setListArray, setInputValue, setIndexValue);
			setLoader({ ...loader, addToTail: false });
			setCurrButton("");
			setLoading(false);
		}
	};
	const deleteHead = async () => {
		if (NewLinkedList.size > 0) {
			setLoading(true);
			setLoader({ ...loader, deleteHead: true });
			setCurrButton(Buttons.deleteHead);
			setInputIndex(0);
			setDeletedValue(listArray[0].value);
			setAddTo({ ...addTo, deleteHead: true });
			listArray[0].value = "";
			await delay(SHORT_DELAY_IN_MS);
			NewLinkedList.deleteHead();
			setAddTo({ ...addTo, deleteHead: false });
			const arr = NewLinkedList.makeArray();
			if (arr.length === 0) setListArray([]);
			await addToArr(0, arr, setListArray, setInputValue, setIndexValue);
			setLoader({ ...loader, deleteHead: false });
			setCurrButton("");
			setLoading(false);
		}
	};
	const deleteTail = async () => {
		setLoading(true);
		setLoader({ ...loader, deleteTail: true });
		setCurrButton(Buttons.deleteTail);
		setInputIndex(listArray.length - 1);
		setDeletedValue(listArray[listArray.length - 1].value);
		setAddTo({ ...addTo, deleteTail: true });
		listArray[listArray.length - 1].value = "";
		await delay(SHORT_DELAY_IN_MS);
		NewLinkedList.deleteTail();
		setAddTo({ ...addTo, deleteTail: false });
		const arr = NewLinkedList.makeArray();
		if (arr.length === 0) setListArray([]);
		await addToArr(arr.length - 1, arr, setListArray, setInputValue, setIndexValue);
		setLoader({ ...loader, deleteTail: false });
		setCurrButton("");
		setLoading(false);
	};
	const addIndex = async () => {
		if (
			inputValue &&
			indexValue &&
			Number(indexValue) < NewLinkedList.size &&
			NewLinkedList.size < 6
		) {
			setLoading(true);
			setLoader({ ...loader, addAtIndex: true });
			setCurrButton(Buttons.addAtIndex);
			setAddTo({ ...addTo, addToIndex: true });
			const arr = NewLinkedList.makeArray();
			await findIndex(Number(indexValue), arr, setListArray, setInputIndex, "add");
			setAddTo({ ...addTo, addToIndex: false });
			NewLinkedList.insertAt(inputValue, Number(indexValue));
			const arr2 = NewLinkedList.makeArray();
			await addToArr(Number(indexValue), arr2, setListArray, setInputValue, setIndexValue);
			setLoader({ ... loader, addAtIndex: false });
			setCurrButton("");
			setLoading(false);
		}
	};
	const deleteIndex = async () => {
		if (indexValue && Number(indexValue) < NewLinkedList.size) {
			setLoading(true);
			setLoader({ ...loader, deleteAtIndex: true });
			setCurrButton(Buttons.deleteAtIndex);
			const arr = NewLinkedList.makeArray();
			await findIndex(Number(indexValue), arr, setListArray, setInputIndex, "delete");
			await delay(SHORT_DELAY_IN_MS)
			setDeletedValue(listArray[Number(indexValue)].value);
			setAddTo({ ...addTo, deleteIndex: true });
			arr[Number(indexValue)].value = "";
			setListArray([...arr]);
			setInputIndex(Number(indexValue));
			await delay(SHORT_DELAY_IN_MS);
			setAddTo({ ...addTo, deleteIndex: false });
			NewLinkedList.deleteByIndex(Number(indexValue));
			const arr2 = NewLinkedList.makeArray();
			if (arr.length === 0) setListArray([]);
			await addToArr(Number(indexValue), arr2, setListArray, setInputValue, setIndexValue);
			setLoader({ ... loader, deleteAtIndex: false });
			setCurrButton("");
			setLoading(false);
		}
	}

  return (
    <SolutionLayout title="Связный список">
			<div className={styles.container}>
				<div className={styles.inputs}>
					<Input
						name="value"
						value={inputValue}
						type="text"
						onChange={onChangeInput}
						isLimitText
						maxLength={4}
						extraClass={styles.input}
					/>
					<Button
						text="Добавить в head"
						isLoader={loader.addToHead}
						onClick={addToHead}
						extraClass={styles.smallButton}
						disabled={!inputValue || listArray.length >= 6 || (loading && disabledButton(Buttons.addToHead, currButton))}
					/>
					<Button
						text="Добавить в tail"
						isLoader={loader.addToTail}
						onClick={addToTail}
						extraClass={styles.smallButton}
						disabled={!inputValue || listArray.length >= 6 || (loading && disabledButton(Buttons.addToTail, currButton))}
					/>
					<Button
						text="Удалить из head"
						isLoader={loader.deleteHead}
						onClick={deleteHead}
						extraClass={styles.smallButton}
						disabled={listArray.length === 0 || (loading && disabledButton(Buttons.deleteHead, currButton))}
					/>
					<Button
						text="Удалить из tail"
						isLoader={loader.deleteTail}
						onClick={deleteTail}
						extraClass={styles.smallButton}
						disabled={listArray.length === 0 || (loading && disabledButton(Buttons.deleteTail, currButton))}
					/>
				</div>
				<div className={styles.inputs}>
					<Input
						name="index"
						value={indexValue}
						type="number"
						onChange={onChangeIndex}
						extraClass={styles.input}
					/>
					<Button
						text="Добавить по индексу"
						isLoader={loader.addAtIndex}
						onClick={addIndex}
						extraClass={styles.button}
						disabled={(!inputValue || !indexValue || Number(indexValue) > listArray.length - 1) || (loading && disabledButton(Buttons.addAtIndex, currButton))}
					/>
					<Button
						text="Удалить по индексу"
						isLoader={loader.deleteAtIndex}
						onClick={deleteIndex}
						extraClass={styles.button}
						disabled={(!indexValue || Number(indexValue) > listArray.length - 1) || (loading && disabledButton(Buttons.deleteAtIndex, currButton))}
					/>
				</div>
			</div>
			<ul className={styles.list}>
				{listArray.length > 0 ? listArray.map((item, index) => (
					<li key={index} className={styles.part}>
						<div className={styles.circle}>
							{(addTo.addToHead || addTo.addToIndex || addTo.addToTail) &&
							index === Number(inputIndex) && (
								<div className={styles.circleTop}>
									<Circle isSmall letter={inputValue} state={ElementStates.Changing} />
								</div>
							)}
						<Circle
							letter={item.value}
							state={item.color}
							index={index}
							head={!addTo.addToHead ? headList(index) : null}
							tail={
								!addTo.deleteTail &&
								!(addTo.deleteIndex && inputIndex === listArray.length - 1)
								? tailList(index, listArray)
								: null
							}
						/>
						{(addTo.deleteHead || addTo.deleteTail || addTo.deleteIndex) &&
							index === Number(inputIndex) && (
								<div className={styles.circleBottom}>
									<Circle isSmall letter={deletedValue} state={ElementStates.Changing} />
								</div>
							)}
						</div>
						{index !== listArray.length - 1 && <ArrowIcon />}
					</li>
				)) : null}
			</ul>
    </SolutionLayout>
  );
};
