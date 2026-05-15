import { test, expect } from '../../fixtures/baseTest';

test('test', async ({ page }) => {
    page.setDefaultTimeout(60000);
    await page.locator('.icon-user').first().click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*\/login/);
    // await page.getByRole('textbox', { name: 'E-post' }).click();
    await page.getByRole('textbox', { name: 'E-post' }).fill('sibenson.gautam@hazesoft.co');
    // await page.getByRole('textbox', { name: 'Lösenord' }).click();
    await page.getByRole('textbox', { name: 'Lösenord' }).fill('Sidd@123');
    await page.getByRole('button', { name: 'Logga in' }).click();
    // await page.goto('https://uat-storefront-qut.hdlcommerce.cloud/se/sv');
    // await expect(page.getByText('Populära kategorier')).toBeVisible();

    await page.getByRole('banner').getByRole('link', { name: 'Hårprodukter' }).click();
    await page.getByText('Service Perm Pre Treatment 18ml').click();
    // await page.getByRole('link', { name: 'thumb image Service Perm Pre' }).click();
    await page.getByRole('button', { name: 'Lägg till i kundvagn' }).click();
    // await expect(page.locator('div').filter({ hasText: 'Service Perm Pre Treatment' }).nth(2)).toBeVisible();
    // await page.getByRole('link', { name: 'Gå till kassan ' }).click();
    // await expect(page.getByText('Betalning', { exact: true })).toBeVisible();

    await expect(page.locator('.drawer-body')).toBeVisible();
    await expect(page.locator('.drawer-footer')).toBeVisible();
    await page.getByText('Gå till kassan').click();


    // await page.waitForTimeout(5000);
    await page.getByPlaceholder('E-post').fill('sibenson.gautam@hazesoft.co');
    await page.getByPlaceholder('Telefon').fill('234567');
    await page.getByPlaceholder('Förnamn').fill('Sibenson');
    await page.getByPlaceholder('Efternamn').fill('Gautam');
    await page.getByPlaceholder('Adressrad 1').fill('test');
    await page.getByPlaceholder('Adressrad 2').fill('test');
    const postal = page.getByPlaceholder('Postnummer')
    await postal.fill('12234');
    await page.getByPlaceholder('Stad').fill('test');
    await page.getByPlaceholder('Område').fill('test');
    await expect(postal).toBeEnabled({ timeout: 10000 });

    await page.getByText(/Home Delivery/).check();

    await page.waitForTimeout(10000);  

    //   const cardNumber = page.locator('[data-field="number"]').getByLabel('Kortnummer');
    //   console.log(await cardNumber)
    //   console.log(await cardNumber.isVisible());
    const checkoutFrame = page.frameLocator(
        'iframe[title="Ram för inmatning av säker betalning"]'
    );

    await expect(
        checkoutFrame.getByLabel('Kortnummer')
    ).toBeVisible({ timeout: 30000 });

    await checkoutFrame
        .getByLabel('Kortnummer')
        .fill('4111 1111 1111 1111');

    await checkoutFrame.getByLabel('Sista giltighetsdag').fill('03 / 30');
    await checkoutFrame.getByLabel('Säkerhetskod').fill('737');
    await page.getByRole('button', { name: /pay/i }).click();

    await page.waitForURL('**/success/**');
    // await expect(page.getByText('Tack för din beställning!')).toBeVisible();
});
