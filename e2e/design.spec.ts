import { test, expect } from '@playwright/test';

test.describe('Toybox Retro Design - Start Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should load with off-white background', async ({ page }) => {
    const body = page.locator('body');
    const bgColor = await body.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toMatch(/rgb\(248,\s*248,\s*248\)/);
  });

  test('should display Soc Ops title with Syne font', async ({ page }) => {
    const title = page.locator('h1:has-text("Soc Ops")');
    await expect(title).toBeVisible();
    
    const fontFamily = await title.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toContain('Syne');
  });

  test('should have crimson Start Game button', async ({ page }) => {
    const button = page.locator('button:has-text("Start Game")');
    await button.waitFor({ state: 'visible' });
    const bgColor = await button.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toMatch(/rgb\(220,\s*20,\s*60\)/);
  });

  test('should use Rubik font for body text', async ({ page }) => {
    const body = page.locator('body');
    const fontFamily = await body.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toContain('Rubik');
  });

  test('should have bold headings', async ({ page }) => {
    const h1 = page.locator('h1').first();
    const fontWeight = await h1.evaluate((el) =>
      window.getComputedStyle(el).fontWeight
    );
    expect(['700', 'bold']).toContain(fontWeight);
  });

  test('should display How to play info card', async ({ page }) => {
    const card = page.locator('text=How to play');
    await expect(card).toBeVisible();
  });
});

test.describe('Toybox Retro Design - Game Screen', () => {
  test('should have cobalt blue header', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    const bgColor = await header.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toMatch(/rgb\(0,\s*71,\s*171\)/);
  });

  test('should have golden title in header', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    
    const title = page.locator('header h1');
    const color = await title.evaluate((el) =>
      window.getComputedStyle(el).color
    );
    expect(color).toMatch(/rgb\(255,\s*215,\s*0\)/);
  });

  test('should display 5x5 bingo grid', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for game board to render
    await page.waitForTimeout(500);
    
    const squares = page.locator('button[aria-label]');
    const count = await squares.count();
    expect(count).toBe(25);
  });

  test('should have visible back button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    
    const backBtn = page.locator('button:has-text("← Back")');
    await expect(backBtn).toBeVisible();
  });
});

test.describe('Toybox Retro Design - Interactions', () => {
  test('should mark square with white text and checkmark', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const squares = page.locator('button[aria-label]');
    await squares.nth(1).waitFor({ state: 'visible' });
    await squares.nth(1).click();
    await page.waitForTimeout(300);

    const textColor = await squares.nth(1).evaluate((el) =>
      window.getComputedStyle(el).color
    );
    expect(textColor).toMatch(/rgb\(255,\s*255,\s*255\)/);

    const content = await squares.nth(1).textContent();
    expect(content).toContain('✓');
  });

  test('should show BINGO modal on winning line', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const squares = page.locator('button[aria-label]');
    await squares.nth(0).waitFor({ state: 'visible' });
    
    // Mark first row (indices 0-4) to get BINGO
    for (let i = 0; i < 5; i++) {
      await squares.nth(i).click();
      await page.waitForTimeout(200);
    }

    // Wait for modal container to appear
    await page.waitForTimeout(500);
    const modal = page.locator('div.fixed.inset-0.bg-black');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Then check for BINGO text
    const bingoText = page.locator('h2:has-text("BINGO!")');
    await expect(bingoText).toBeVisible({ timeout: 5000 });
  });

  test('should have celebration emoji and Keep Playing button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const squares = page.locator('button[aria-label]');
    await squares.nth(0).waitFor({ state: 'visible' });
    
    // Mark first row (indices 0-4) to get BINGO
    for (let i = 0; i < 5; i++) {
      await squares.nth(i).click();
      await page.waitForTimeout(200);
    }

    // Wait for modal to render
    await page.waitForTimeout(500);
    
    const modal = page.locator('.fixed.inset-0.bg-black');
    await expect(modal).toBeVisible({ timeout: 5000 });

    const emoji = page.locator('div:has-text("🎉")');
    await expect(emoji).toBeVisible({ timeout: 5000 });

    const keepPlayingBtn = page.locator('button:has-text("Keep Playing")');
    const bgColor = await keepPlayingBtn.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toMatch(/rgb\(220,\s*20,\s*60\)/);
  });
});

