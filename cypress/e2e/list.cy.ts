import { circleWrapper, circleChangingStyle, circleModifiedStyle, circleDefaultStyle, circleSelector } from "../../src/constants/e2e";
import { DELAY_IN_MS } from "../../src/constants/delays";

const arr = [1, 2, 3, 4, 5];
describe("Linked list", () => {
	beforeEach(() => {
		cy.visit('list');
	})
	it("should buttons be disable with empty input", () => {
		cy.get("input").should("be.empty");
		cy.contains("Добавить в head").should("be.disabled");
		cy.contains("Добавить в tail").should("be.disabled");
		cy.contains("Добавить по индексу").should("be.disabled");
		cy.contains("Удалить по индексу").should("be.disabled");
	});
	it("should render default list correctly", () => {
		const circle = cy.get(circleWrapper).as("circleWrapper").should("have.length", 5);

		arr.forEach((item, index) => {
			circle.each((el, ind) => {
				ind === index && expect(el).contain(item)
			});
		});
		cy.get("@circleWrapper").should("have.length", 5).eq(0).should("contain", "head");
		cy.get("@circleWrapper").should("have.length", 5).eq(4).should("contain", "tail");
	})
	it("should add element to head correctly", () => {
		cy.get("input").first().type("10");
		cy.contains("Добавить в head").click();
		cy.get(circleModifiedStyle).contains("10");
		cy.wait(DELAY_IN_MS);
		cy.get(circleWrapper)
			.should("have.length", 6).each((item, index) => {
				index === 0 && expect(item).contain("10");
				index === 0 && expect(item).contain("head");
				index === 5 && expect(item).contain("tail");
			})
		cy.get(circleDefaultStyle).contains("10");
	})
	it("should add element to tail correctly", () => {
		cy.get("input").first().type("11");
		cy.contains("button", "Добавить в tail").click();
		cy.get(circleModifiedStyle).contains("11");
		cy.wait(DELAY_IN_MS);
		cy.get(circleSelector)
			.should("have.length", 6).each((item, index) => {
				index === 6 && expect(item).contain("11");
				index === 6 && expect(item).contain("tail");
			})
		cy.get(circleDefaultStyle).contains("11");
	})
	it("should delete from head correctly", () => {
		cy.contains("button", "Удалить из head").click();
		cy.get(circleChangingStyle).contains(arr[0]);
		cy.wait(DELAY_IN_MS);
		cy.get(circleWrapper).first().contains("head");
		cy.get(circleWrapper).should("have.length", 4);
	})
	it("should delete from tail correctly", () => {
		cy.contains("button", "Удалить из tail").click();
		cy.get(circleChangingStyle).contains(arr[arr.length - 1]);
		cy.wait(DELAY_IN_MS);
		cy.get(circleWrapper).last().contains("tail");
		cy.get(circleWrapper).last().contains(arr[arr.length - 2]);
		cy.get(circleWrapper).should("have.length", 4);
	});
	it("should remove by index correctly", () => {
		cy.get("input").last().type(arr[0].toString());
		cy.contains("button", "Удалить по индексу").click();
		cy.get(circleWrapper).eq(0).find(circleChangingStyle);
		cy.get(circleChangingStyle).contains(arr[0]);
		cy.get(circleWrapper).should("have.length", 4);
	});
});