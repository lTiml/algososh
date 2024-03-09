import { circleSelector } from "../../src/constants/e2e";

const expectedArr = [1, 1, 2, 3, 5, 8];
describe("StringComponent", () => {
	beforeEach(() => {
		cy.visit('fibonacci');
	});
	it("should be disable button when input is empty", () => {
		cy.get("input").should("have.value", 0);
		cy.contains("Рассчитать").should("be.disabled");
	});
	it("should make correct array", async () => {
		cy.get("input").type("5");
		cy.contains("РАссчитать").click();
		cy.get(circleSelector).should("have.length", expectedArr.length).then(elements => {
			elements.each((index, item) => {
				const expectedNumber = expectedArr[index];
				cy.wrap(item).should("contain", expectedNumber.toString());
			})
		})
	})
});