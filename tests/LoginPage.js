exports.LoginPage = class LoginPage {
	//Создаем поля и находим нужные поля по placeholder на страницы авторизации
	constructor(page) {

		this.page = page;
		this.username_field = page.getByPlaceholder('Username');
		this.password_field = page.getByPlaceholder('Password');
		this.login_button = page.getByText('Login');

	}
	//Переход на нужную страницу
	async gotoSitePage(site_page) {
	
		await this.page.goto(site_page);
	
	}
	//Заполнение данных для входа в систему
	async login(username, password) {

		await this.username_field.fill(username);
		await this.password_field.fill(password);
		await this.login_button.click();

	}	

}