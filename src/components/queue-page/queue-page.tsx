import styles from "./queue.module.css";

import { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { delay } from "../../services/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export type TQueue = {
	value: string;
	color: ElementStates;
}

const CirclesQueue = new Queue<TQueue | null>(7);
const defaultQueue: TQueue[] = Array.from({ length: 7 }, () => ({
	value: "",
	color: ElementStates.Default,
}));

export const QueuePage = () => {
	const [inputValue, setInputValue] = useState("");
	const [queueArr, setQueueArr] = useState<TQueue[]>(defaultQueue);
	const [queue, setQueue] = useState(CirclesQueue);
	const [loading, setLoading] = useState({
		add: false,
		delete: false,
		clear: false,
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	}

	const addValue = async () => {
		if (inputValue) {
			setLoading(prevState => ({ ...prevState, add: true }));
			setInputValue("");
			CirclesQueue.enqueue({ value: inputValue, color: ElementStates.Default });
			setQueue(CirclesQueue);
			queueArr[queue.getTail() - 1] = {
				value: "",
				color: ElementStates.Changing,
			};
			setQueueArr([...queueArr]);
			await delay(SHORT_DELAY_IN_MS);
			queueArr[queue.getTail() - 1] = {
				value: inputValue,
				color: ElementStates.Changing,
			};
			setQueueArr([...queueArr]);
			queueArr[queue.getTail() - 1] = {
				value: inputValue,
				color: ElementStates.Default,
			};
			setQueueArr([...queueArr]);
			setLoading(prevState => ({ ...prevState, add: false }));
		}
	};

	const deleteValue = async () => {
		setLoading(prevState => ({ ...prevState, delete: true }))
		queue.dequeue();
		setQueue(queue);
		queueArr[queue.getHead() - 1] = {
			value: queueArr[queue.getHead() - 1].value,
			color: ElementStates.Changing,
		};
		setQueueArr([...queueArr]);
		await delay(SHORT_DELAY_IN_MS);
		queueArr[queue.getHead() - 1] = {
			value: "",
			color: ElementStates.Default,
		}
		setQueueArr([...queueArr]);
		setLoading(prevState => ({ ...prevState, delete: false }));
	};

	const clearQueue = () => {
		setLoading(prevState => ({ ...prevState, clear: true }))
		CirclesQueue.clear();
		setQueue(CirclesQueue);
		setQueueArr(
			Array.from({ length: 7 }, () => ({
				value: "",
				color: ElementStates.Default,
			}))
		);
		setLoading(prevState => ({ ...prevState, clear: false }))
	};

	const head = (index: number) => {
		return index === queue.getHead() && !queue.isEmpty() ? "head" : null;
	};
	const tail = (index: number) => {
		return index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : null;
	}

  return (
    <SolutionLayout title="Очередь">
			<div className={styles.container}>
				<Input
					name="stack"
					value={inputValue}
					type="text"
					onChange={onChange}
					isLimitText
					maxLength={4}
					extraClass={styles.input}
				/>
				<Button
					text="Добавить"
					onClick={addValue}
					disabled={!inputValue || (loading.delete || loading.clear)}
					isLoader={loading.add}
				/>
				<Button
					text="Удалить"
					onClick={deleteValue}
					disabled={queue.isEmpty() || (loading.add || loading.clear)}
					isLoader={loading.delete}
				/>
				<Button
					text="Очистить"
					onClick={clearQueue}
					disabled={queue.isEmpty() || (loading.add || loading.delete)}
					isLoader={loading.clear}
					extraClass={styles.clean}
				/>
			</div>
			<ul className={styles.wrapper}>
				{queueArr &&
					queueArr.map((item, index) => (
						<li key={index}>
							<Circle
								letter={item.value}
								state={item.color}
								index={index}
								head={head(index)}
								tail={tail(index)}
							/>
						</li>
					))}
			</ul>
    </SolutionLayout>
  );
};
