import styles from "./fibonacci.module.css";

import { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { fibonacciDelay } from "./fibonacci.utils";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage = () => {
	const [number, setNumber] = useState<number>(0);
	const [loading, setLoading] = useState(false);
	const [fibonacciArr, setFibonacciArr] = useState<Array<number>>([]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNumber(Number(e.target.value));
	};

	const handleSubmit = async (e: FormEvent) => {
		if (!number) return;
		setLoading(true);
		e.preventDefault();
		await fibonacciDelay(number, setFibonacciArr);
		setLoading(false);
	}
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form
		 	className={styles.input}
			onSubmit={(e:FormEvent) => handleSubmit(e)}
		>
			<Input value={number} isLimitText={true} max={19} maxLength={19} type="number" onChange={onChange} />
			<Button text="Рассчитать" disabled={number > 19 || number <= 0} isLoader={loading} type="submit" />
		</form>
		<ul className={styles.circles}>
			{fibonacciArr.length !== 0 &&
				fibonacciArr.map((num, index) => (
					<Circle key={index} letter={String(num)} index={index} />
				))}
		</ul>
    </SolutionLayout>
  );
};
