import { TQueue } from "./queue-page";

interface IQueue<T> {
	enqueue: (item: T) => void;
	dequeue: () => void;
	peak: () => T | null;
	getQueue: () => Array<T | null>;
	clear: () => void;
	isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
	private container: (T | null)[] = [];
	private head = 0;
	private tail = 0;
	private readonly size: number = 0;
	private length: number = 0;

	constructor(size: number) {
		this.size = size;
		this.container = Array(size);
	}

	enqueue = (item: T) => {
		if (this.length >= this.size) {
			throw new Error("Недопустимая длина очереди");
		} else {
			this.container[this.tail % this.size] = item;
			this.tail++;
			this.length++;
		}
	}

	dequeue = () => {
		if (this.isEmpty()) {
			throw new Error("Очередь пустая");
		} else {
			this.container[this.head % this.size] = null;
			this.length--;
			this.head++;
		}
	};

	peak = (): T | null => {
		if (this.isEmpty()) {
			throw new Error("Очередь пустая");
		}
		return this.container[this.head % this.size]
	};
	getTail = () => this.tail
	getHead = () => this.head
	clear = () => {
		this.head = 0;
		this.tail = 0;
		this.container = [];
		this.length = 0
	}
	getQueue = (): Array<T | null> => [...this.container]
	isEmpty = () => this.length === 0;
}