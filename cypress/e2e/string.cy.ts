import { DELAY_IN_MS } from "../../src/constants/delays";

describe("StringComponent", () => {
	beforeEach(() => {
		cy.visit('recursion');
	})

	it("should be disable button when input is empty", () => {
		cy.get("input").should("be.empty");
		cy.contains("Развернуть").should("be,disabled");
	})
	it("should reverse correctly", () => {
		cy.get("input").type('123');
		cy.contains("Развернуть").click();
		cy.get("[data-cy='circle']").as("circleComponent");
		cy.get("@circleComponent").each((elem, index) => {
			if (index === 0 || index === 2) {
				cy.wrap(elem).should("have.css", "border", "4px solid rgb(210, 82, 225)")
			}
			if (index === 0) expect(elem).to.contain("1");
			if (index === 2) expect(elem).to.contain("3");
		})
		cy.wait(DELAY_IN_MS);
		cy.get("@circleComponent").each((elem, index) => {
			cy.wrap(elem).should("have.css", "border", "4px solid rgb(127, 224, 81)")

			if (index === 0) expect(elem).to.contain("3")
			if (index === 1) expect(elem).to.contain("2")
			if (index === 2) expect(elem).to.contain("1")
		})
	})
})