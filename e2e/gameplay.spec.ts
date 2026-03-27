import { test, expect } from '@playwright/test';

test.describe('Gameplay with Design Validation', () => {
  test('should navigate from start to game screen', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should transition from start screen to game screen with design intact', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();

    // Wait for game screen
    await page.waitForLoadState('domcontentloaded');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check cobalt header background
    const computedBg = await header.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(computedBg).toMatch(/rgb\(0,\s*71,\s*171\)/);

    // Verify golden title
    const title = page.locator('header h1');
    const color = await title.evaluate((el) =>
      window.getComputedStyle(el).color
    );
    expect(color).toMatch(/rgb\(255,\s*215,\s*0\)/);
  });

  test('should show bingo board with 5x5 grid', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
    
    // Find all bingo squares (5x5 grid = 25 buttons)
    const squares = page.locator('button[aria-label]');
    await squares.nth(0).waitFor({ state: 'visible' });
    
    const count = await squares.count();
    expect(count).toBe(25);
  });

  test('should mark square with white text', async ({ page }) => {
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
  });

  test('should display checkmark on marked squares', async ({ page }) => {
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

    const markedSquareContent = await squares.nth(1).textContent();
    expect(markedSquareContent).toContain('✓');
  });

  test('should show bingo celebration modal on winning line', async ({ page }) => {
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
    
    // Wait for modal container
    const modal = page.locator('.fixed.inset-0.bg-black');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Then check for BINGO text
    const bingoText = page.locator('h2:has-text("BINGO!")');
    await expect(bingoText).toBeVisible({ timeout: 5000 });
  });

  test('should have Keep Playing button with correct color', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
    
    const squares = page.locator('button[aria-label]');
    await squares.nth(0).waitFor({ state: 'visible' });
    
    // Mark first row (indices 0-4) to win
    for (let i = 0; i < 5; i++) {
      await squares.nth(i).click();
      await page.waitForTimeout(200);
    }

    // Wait for modal to render
    await page.waitForTimeout(500);
    
    // Wait for modal to be visible
    const modal = page.locator('.fixed.inset-0.bg-black');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Check Keep Playing button color
    const keepPlayingBtn = page.locator('button:has-text("Keep Playing")');
    const bgColorBtn = await keepPlayingBtn.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColorBtn).toMatch(/rgb\(220,\s*20,\s*60\)/);
  });

  test('should allow marking and unmarking squares', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
    
    const squares = page.locator('button[aria-label]');
    await squares.nth(1).waitFor({ state: 'visible' });
    
    // Mark square
    await squares.nth(1).click();
    await page.waitForTimeout(300);
    let content = await squares.nth(1).textContent();
    expect(content).toContain('✓');

    // Unmark square
    await squares.nth(1).click();
    await page.waitForTimeout(300);
    content = await squares.nth(1).textContent();
    expect(content).not.toContain('✓');
  });

  test('back button should navigate back to start screen', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const startButton = page.locator('button:has-text("Start Game")');
    await startButton.waitFor({ state: 'visible' });
    await startButton.click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
    
    const backBtn = page.locator('button:has-text("← Back")');
    await backBtn.waitFor({ state: 'visible' });
    await backBtn.click();

    await page.waitForLoadState('domcontentloaded');
    
    // Should see start screen again
    const newStartButton = page.locator('button:has-text("Start Game")');
    await expect(newStartButton).toBeVisible();
  });
});
