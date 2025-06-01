import { test, expect } from '@playwright/test';

test('2', async ({ page }) => {
  // Arrange
  const data = {
    user: 'admin',
    password: 'test',
    id: '123',
    tempPassword: 'Test123',
    name: 'Test',
    email: 'test@test.com',
    isActive: true,
  };

  // Act and Assert
  await page.goto('/');
  await page.getByTestId('user-input').locator('input').fill('admin');
  await page.getByTestId('password-input').locator('input').fill('test');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(/submodule-list/);
  await page.getByRole('link', { name: /empleados/i }).click();
  await expect(page).toHaveURL(/employees/);
  await page.getByRole('button', { name: /nuevo empleado/i }).click();

  const employeeForm = page.getByTestId('employee-form');

  await employeeForm
    .getByRole('textbox', { name: /id/i })
    .fill(data.id, { force: true });
  await employeeForm
    .getByRole('textbox', { name: /clave temporal/i })
    .fill(data.tempPassword);
  await employeeForm.getByRole('textbox', { name: /nombre/i }).fill(data.name);
  await employeeForm.getByRole('textbox', { name: /email/i }).fill(data.email);
  if (data.isActive) {
    await employeeForm.getByRole('checkbox', { name: /activo/i }).check();
  }
  await employeeForm.getByRole('button', { name: /guardar/i }).click();
});
