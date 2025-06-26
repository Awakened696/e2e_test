import { test, expect } from '@playwright/test';
import {LoginPage} from '../tests/LoginPage.js';
import {BuyerInfo} from '../tests/BuyerInfo.js';

	test.describe('test with auth', () => {
		//Общая часть для тестов с авторизацией
		test.beforeEach(async ({ page }) => {

			const Login = new LoginPage(page)
			//Переход на страницу логина
			await Login.gotoSitePage('https://www.saucedemo.com/');
			//Логин: standard_user , пароль: secret_sauce , можно менять и заходить под другими данными
			await Login.login('standard_user', 'secret_sauce')

		});

		test('sort', async ({ page }) => {

  			//Нахождения select сортировки и выбор сортировки по возврастанию цены
  			const locator = page.locator('select');
  			await locator.selectOption(['lohi']);
			//Выбор активной опции select и нахождения нужного значения цены по возврастанию
			const price_loc = page
				.locator('.active_option')
				.getByText('Price (low to high)');

  			await expect(price_loc).toBeVisible();
  
		});

		test('order without zip code', async ({ page }) => {
			//Выбор товар для добавления в корзину, можно изменить на другой id кнопки товара (например: вместо -backpack можно указать -bike-light)
			await page.locator('#add-to-cart-sauce-labs-backpack').click();
			await page.locator('.shopping_cart_link').click();
			await page.locator('#checkout').click();
			
			const Buyer = new BuyerInfo(page);
			//Вводим данные покупателя: имя, фамилия, в данной проверки zip-code не нужен
			await Buyer.binfo('John', 'Snow', '');
			
			await expect(page.getByText('Error: Postal Code is required')).toBeVisible();

		});

		test('order', async ({ page }) => {
			//Выбор товар для добавления в корзину, можно изменить на другой id кнопки товара (например: вместо -backpack можно указать -bike-light)
			await page.locator('#add-to-cart-sauce-labs-backpack').click();
			await page.locator('.shopping_cart_link').click();
			await page.locator('#checkout').click();
			
			const Buyer = new BuyerInfo(page);
			//Вводим данные покупателя: имя, фамилия и zip-code
			await Buyer.binfo('John', 'Snow', '12345-6789');

			await page.locator('#finish').click();
			
			await expect(page.getByText('Thank you for your order!')).toBeVisible();

		});

		test('empty basket', async ({ page }) => {
			//Переходим сразу в корзину без добавления товара
			await page.locator('.shopping_cart_link').click();
			await page.locator('#checkout').click();

			const Buyer = new BuyerInfo(page);
			//Вводим данные покупателя: имя, фамилия и zip-code
			await Buyer.binfo('John', 'Snow', '12345-6789');

			await page.locator('#finish').click();
			
			await expect(page.getByText('Thank you for your order!')).toBeVisible();

		});

   	});

	test('test without auth', async ({ page }) => {
		
		const noLogin = new LoginPage(page)
		//Переход на страницу оформления заказа без авторизации
		await noLogin.gotoSitePage('https://www.saucedemo.com/checkout-step-one.html');

		await expect(page.getByText("Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.")).toBeVisible();
		
	});
