import { circleSelector } from "../../src/constants/e2e";

const inputValues = ["1", "2", "3"];

describe("Queue", () => {
	beforeEach(() => {
		cy.visit("queue");
	});
	it("Should button be desable with empty input", () => {
		cy.get("input").should("be.empty");
		cy.contains("Добавить").should("be.disabled");
	})
	it("should correctly add value to queue", () => {
		inputValues.forEach((value, index) => {
			cy.get("input").type(value);
			cy.contains("Добавить").click();
			cy.get(circleSelector).as("circleWrapper").contains(value);
			cy.get("@circleWrapper").eq(index).should("contain", inputValues[index]);
			if (index === 0) {
				cy.get("@circleWrapper").should("contain", "tail").and("contain", "head")
			}
			cy.get("@circleWrapper").should("contain", "tail")
		})
	})
	it("should correctly delete value to queue", () => {
		cy.get("input").type("0");
		cy.contains("Добавить").click();
		cy.get("input").type("1");
		cy.contains("Добавить").click();
		cy.get(circleSelector).as("circleComponent");
		cy.contains("Удалить").click();

		cy.get("@circleComponent").each((item, index) => {
			index === 0 && expect(item).to.contain("0");
			if (index === 1) {
				expect(item).to.contain("1");
				expect(item).to.contain("tail");
			}
		})
		cy.get("@circleComponent").eq(1).should("contain", "head")
	})
	it("should correctly clear queue", () => {
		inputValues.forEach(value => {
			cy.get("input").type(value);
			cy.contains("Добавить").click();
		})
		cy.contains("Очистить").click();
		cy.get(circleSelector).should("contain", "")
	})
})