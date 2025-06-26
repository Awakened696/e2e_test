exports.AddGoods = class AddGoods {

	constructor(page) {

		this.page = page;
		this.add_goods = page.locator('#add-to-cart-sauce-labs-');
		this.shopping_button = page.locator('.shopping_cart_link');
		this.checkout_button = page.locator('#checkout');

	}

	async addgoods(name_goods) {

		await this.add_goods(name_goods).click();
		await this.shopping_button.click();
		await this.checkout_button.click();

	}	

}