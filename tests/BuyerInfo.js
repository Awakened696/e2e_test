exports.BuyerInfo = class BuyerInfo {
	//Создаем поля и находим нужные поля по placeholder на страницы информации о покупателе
	constructor(page) {

		this.page = page;
		this.fname_field = page.getByPlaceholder('First Name');
		this.lname_field = page.getByPlaceholder('Last Name');
		this.zip_field = page.getByPlaceholder('Zip/Postal Code');
		this.continue_button = page.locator('#continue');

	}
	//Заполнение информации о покупателе
	async binfo(fname, lname, zipcode) {

		await this.fname_field.fill(fname);
		await this.lname_field.fill(lname);
		await this.zip_field.fill(zipcode);
		await this.continue_button.click();

	}	

}