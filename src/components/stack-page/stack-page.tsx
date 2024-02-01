import styles  from "./stack-page.module.css"

import { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack";
import { delay } from "../../services/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

type TStack = {
	value: string;
	color: ElementStates
}

export const CirclesStack = new Stack<TStack>();

export const StackPage = () => {
	const [loading, setLoading] = useState({
		add: false,
		delete: false,
		clear: false,
	});
	const [inputValue, setInputValue] = useState("");
	const [stackArr, setStackArr] = useState<TStack[]>([]);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const addValue = async () => {
		if (inputValue) {
			setLoading(prevState => ({ ...prevState, add: true}));
			CirclesStack.push({ value: inputValue, color: ElementStates.Changing });
			setStackArr([...CirclesStack.getStack()]);
			setInputValue("");
			await delay(SHORT_DELAY_IN_MS);
			CirclesStack.peak().color = ElementStates.Default;
			setStackArr([...CirclesStack.getStack()]);
			setLoading(prevState => ({ ...prevState, add: false }));
		}
	};

	const clearStack = () => {
		setLoading(prevState => ({ ...prevState, clear: true }));
		CirclesStack.clear();
		setStackArr([]);
		setLoading(prevState => ({ ...prevState, clear: false }));
	};

	const deleteValue = async () => {
		if (CirclesStack.getStack().length !== 0) {
			if (CirclesStack.peak()) {
				CirclesStack.peak().color = ElementStates.Changing;
			}
			setLoading(prevState => ({ ...prevState, delete: true }))
			setStackArr([...CirclesStack.getStack()]);
			await delay(SHORT_DELAY_IN_MS);
			CirclesStack.pop();
			if (CirclesStack.peak()) {
				CirclesStack.peak().color = ElementStates.Default;
			}
			setStackArr([...CirclesStack.getStack()]);
			setLoading(prevState => ({ ...prevState, delete: false }))
		}
	}

	const head = (item: TStack) => {
		return item === stackArr[stackArr.length - 1] ? "top" : null;
	};

  return (
    <SolutionLayout title="Стек">
			<div className={styles.container}>
				<Input
					name="stack"
					type="text"
					value={inputValue}
					isLimitText
					maxLength={4}
					extraClass={styles.input}
					onChange={onChange}
				/>
				<Button
					text="Добавить"
					onClick={addValue}
					disabled={!inputValue || (loading.clear || loading.clear)}
					isLoader={loading.add}
				/>
				<Button
					text="Удалить"
					onClick={deleteValue}
					disabled={stackArr.length === 0 || (loading.add || loading.clear)}
					isLoader={loading.delete}
				/>
				<Button
					text="Очистить"
					onClick={clearStack}
					disabled={stackArr.length === 0 || (loading.add || loading.delete)}
					isLoader={loading.clear}
					extraClass={styles.clean}
				/>
			</div>
			<ul className={styles.wrapper}>
				{stackArr &&
					stackArr.map((item, index) => (
						<li key={index}>
							<Circle letter={item.value} state={item.color} index={index} head={head(item)} />
						</li>
					))}
			</ul>
    </SolutionLayout>
  );
};
