import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const errors = new WeakMap();
test('thwip audio renders a short, audible, unclipped effect', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const { renderWebShot } = await import('/src/game/webAudio.js');
    const render = async (capture) => {
      const ctx = new OfflineAudioContext(1, 44100, 44100);
      renderWebShot(ctx, capture);
      const samples = (await ctx.startRendering()).getChannelData(0);
      let peak = 0,
        power = 0,
        tail = 0;
      for (let i = 0; i < samples.length; i++) {
        peak = Math.max(peak, Math.abs(samples[i]));
        power += samples[i] ** 2;
        if (i > 33075) tail = Math.max(tail, Math.abs(samples[i]));
      }
      return { peak, rms: Math.sqrt(power / samples.length), tail };
    };
    return { shot: await render(false), capture: await render(true) };
  });
  for (const effect of Object.values(result)) {
    expect(effect.peak).toBeGreaterThan(0.02);
    expect(effect.peak).toBeLessThan(0.8);
    expect(effect.rms).toBeGreaterThan(0.005);
    expect(effect.tail).toBeLessThan(0.0001);
  }
  expect(result.capture.rms).toBeGreaterThan(result.shot.rms);
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await expect(page.getByRole('button', { name: /^Web-shooter sound/ })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
});
test('hard targets are small and evasive while Easy Mode stays larger', async ({ page }) => {
  await page.clock.install();
  await start(page);
  const target = page.getByRole('button', { name: 'Web drone 1' });
  const before = await target.boundingBox();
  expect(before.width).toBe(62);
  expect(before.height).toBe(52);
  await page.clock.runFor(700);
  const after = await target.boundingBox();
  expect(Math.hypot(after.x - before.x, after.y - before.y)).toBeGreaterThan(40);
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByRole('button', { name: /^Easy Mode Slow-moving/ }).click();
  await page.getByRole('button', { name: 'Close panel' }).click();
  await page.getByRole('button', { name: 'Resume mission' }).click();
  await page.clock.runFor(32);
  const easy = await target.boundingBox();
  expect(easy.width).toBe(110);
  await page.clock.runFor(700);
  const moved = await target.boundingBox();
  const easyDistance = Math.hypot(moved.x - easy.x, moved.y - easy.y);
  expect(easyDistance).toBeGreaterThan(5);
  expect(easyDistance).toBeLessThan(Math.hypot(after.x - before.x, after.y - before.y));
});
test.beforeEach(async ({ page }) => {
  errors.set(page, []);
  page.on('pageerror', (e) => errors.get(page).push(e.message));
});
test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});
const start = async (page, id = '01') => {
  await page.getByRole('button', { name: 'ENTER', exact: true }).click();
  await page.getByRole('button', { name: new RegExp('ROOFTOP ' + id) }).click();
};
const hit = async (page, i) => {
  await page.getByRole('button', { name: `Web drone ${i}`, exact: true }).press('Enter');
};
const win = async (page) => {
  for (const i of [1, 2, 3]) await hit(page, i);
  await expect(page.getByRole('dialog')).toBeVisible();
};
const openQuick = async (page) => {
  if (!(await page.getByRole('button', { name: 'Quick Access', exact: true }).isVisible())) {
    await page.getByRole('button', { name: 'Settings', exact: true }).click();
  }
  await page.getByRole('button', { name: 'Quick Access', exact: true }).click();
};
const access = async (page, name) => {
  await openQuick(page);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: new RegExp('^' + name + ' ↗') })
    .click();
};
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
test('Quick Access returns to the starting page after reading or cancelling', async ({ page }) => {
  await openQuick(page);
  await page.getByRole('button', { name: 'Close panel' }).click();
  await expect(page.getByRole('button', { name: 'ENTER', exact: true })).toBeVisible();
  await access(page, 'Skills');
  await page.getByRole('button', { name: 'TensorFlow ↗', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'ENTER', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Quick Access', exact: true })).toBeFocused();
  await expect(page.locator('.destination-grid')).toHaveCount(0);
});
test('drone hits break into falling pieces and smoke, then clean up', async ({ page }) => {
  await start(page);
  await page.locator('.arena').click({ position: { x: 10, y: 10 } });
  await expect(page.locator('.drone-burst')).toHaveCount(0);
  await hit(page, 1);
  const burst = page.locator('.drone-burst');
  await expect(burst.locator('.drone-fragment')).toHaveCount(12);
  await expect(burst.locator('.blast-smoke')).toHaveCount(5);
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  expect(await burst.evaluate((el) => getComputedStyle(el).animationPlayState)).toBe('paused');
  await page.getByRole('button', { name: 'Close panel' }).click();
  await page.getByRole('button', { name: 'Resume mission' }).click();
  await expect(burst).toHaveCount(0, { timeout: 4000 });
  await expect(page.getByRole('button', { name: 'Web drone 1', exact: true })).toBeDisabled();
  await hit(page, 2);
  await hit(page, 3);
  await expect(page.locator('.drone-burst')).toHaveCount(2);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('Vardhan Reddy');
});
test('encounters unlock through keyboard hits, ignore duplicates, and persist', async ({
  page,
}) => {
  await start(page);
  await page.locator('.arena').click({ position: { x: 5, y: 5 } });
  await hit(page, 1);
  await expect(page.getByTestId('accuracy')).toHaveText('50%');
  await page.getByRole('button', { name: 'Web drone 1' }).evaluate((el) => {
    el.click();
    el.click();
  });
  await expect(page.getByTestId('accuracy')).toHaveText('50%');
  await hit(page, 2);
  await hit(page, 3);
  await expect(page.getByRole('dialog')).toContainText('Vardhan Reddy');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('webline-unlocked')))).toEqual([
    'profile',
  ]);
  await page.getByRole('button', { name: 'Close panel' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'ENTER', exact: true }).click();
  await page.getByRole('button', { name: /ROOFTOP 01/ }).click();
  await expect(page.getByRole('dialog')).toContainText('Vardhan Reddy');
});
test('timeout offers retry and easy mode; easy encounters have no deadline', async ({ page }) => {
  await page.clock.install();
  await start(page);
  await hit(page, 1);
  await page.clock.fastForward(30100);
  await expect(page.getByRole('dialog')).toContainText('You captured 1 of 3 drones');
  await page.getByRole('button', { name: 'Retry', exact: true }).click();
  await expect(page.getByTestId('timer')).toHaveText('30s');
  await page.clock.fastForward(30100);
  await page.getByRole('button', { name: 'Easy Mode', exact: true }).click();
  await expect(page.getByTestId('timer')).toHaveText('∞');
  await page.clock.fastForward(45000);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  for (const i of [1, 2, 3]) await hit(page, i);
  await page.clock.runFor(800);
  await expect(page.getByRole('dialog')).toContainText('Vardhan Reddy');
});
test('settings and quick reading pause time without losing the encounter', async ({ page }) => {
  await page.clock.install();
  await start(page);
  await hit(page, 1);
  await page.clock.runFor(4000);
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  const before = await page.getByTestId('timer').textContent();
  await page.clock.runFor(35000);
  await expect(page.getByTestId('timer')).toHaveText(before);
  await page.getByRole('button', { name: 'Close panel' }).click();
  await expect(page.getByRole('dialog')).toContainText('MISSION PAUSED');
  await page.getByRole('button', { name: 'Resume mission' }).click();
  await openQuick(page);
  const quickBefore = await page.getByTestId('timer').textContent();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: /^Skills ↗/ })
    .click();
  await page.clock.runFor(35000);
  await page.getByRole('button', { name: 'Close panel' }).click();
  await page.getByRole('button', { name: 'Resume mission' }).click();
  await expect(page.getByRole('heading', { name: 'Unlock Profile.' })).toBeVisible();
  await expect(page.getByTestId('timer')).toHaveText(quickBefore);
  await expect(page.getByRole('button', { name: 'Web drone 1' })).toBeDisabled();
});
test('difficulty changes restart hits but preserve saved discoveries', async ({ page }) => {
  await start(page);
  await hit(page, 1);
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByRole('button', { name: /^Easy Mode Slow-moving/ }).click();
  await page.getByRole('button', { name: 'Close panel' }).click();
  await page.getByRole('button', { name: 'Resume mission' }).click();
  await expect(page.getByTestId('timer')).toHaveText('∞');
  await expect(page.getByRole('button', { name: 'Web drone 1' })).toBeEnabled();
  await win(page);
});
test('all seven destinations complete the campaign and reset requires confirmation', async ({
  page,
}) => {
  await page.evaluate(() => {
    localStorage.setItem(
      'webline-unlocked',
      JSON.stringify(['profile', 'skills', 'projects', 'experience', 'achievements', 'resume']),
    );
    localStorage.setItem('webline-easy', 'true');
  });
  await page.reload();
  await start(page, '07');
  await win(page);
  await page.getByRole('button', { name: 'Close panel' }).click();
  await expect(page.getByRole('dialog')).toContainText('Neighborhood');
  await page.getByRole('button', { name: 'Replay campaign' }).click();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  expect(
    await page.evaluate(() => JSON.parse(localStorage.getItem('webline-unlocked')).length),
  ).toBe(7);
  await page.getByRole('button', { name: 'Reset Campaign', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm reset' }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('webline-unlocked')))).toEqual(
    [],
  );
});
test('quick access, nested skills/projects, filtering, and PDF download', async ({ page }) => {
  await access(page, 'Skills');
  await page.getByRole('button', { name: 'TensorFlow ↗', exact: true }).click();
  await page.getByRole('button', { name: 'Brahmi Script Recognition ↗', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Approximately 97% test accuracy.');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'TensorFlow', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await access(page, 'Projects');
  await page.getByRole('button', { name: 'IoT', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await access(page, 'Resume');
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'DOWNLOAD PDF', exact: true }).click();
  const file = await pending;
  expect(file.suggestedFilename()).toMatch(/Resume.pdf$/);
  expect(await file.failure()).toBeNull();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('webline-unlocked')))).toEqual(
    [],
  );
});
test('contact draft is honest and restored', async ({ page }) => {
  await access(page, 'Contact');
  await expect(page.getByLabel('Your name')).toHaveValue('');
  await expect(page.getByLabel('Email address')).toHaveValue('');
  await expect(page.getByLabel('Your message')).toHaveValue('');
  await page.getByLabel('Your name').fill('Recruiter');
  await page.getByLabel('Email address').fill('recruiter@example.com');
  await page.getByLabel('Your message').fill('Hello Vishnu, let us discuss an opportunity.');
  await page.getByRole('button', { name: /Open email draft/ }).click();
  await expect(page.getByRole('dialog')).toContainText('press Send in that app');
  await expect(page.getByRole('dialog')).toContainText('Nothing has been sent yet');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error('Clipboard unavailable');
        },
      },
    });
  });
  await page.getByRole('button', { name: 'Copy email details', exact: true }).click();
  await expect(page.getByLabel('Email details to copy')).toContainText('To: vishnu24004@gmail.com');
  await expect(page.getByLabel('Email details to copy')).toContainText(
    'Reply to: recruiter@example.com',
  );
  await page.reload();
  await access(page, 'Contact');
  await expect(page.getByLabel('Your name')).toHaveValue('Recruiter');
});
for (const width of [320, 390, 768, 1440])
  test(`layout, target bounds and reduced motion at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 320 ? 640 : 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await start(page);
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
    const drone = page.getByRole('button', { name: 'Web drone 1' });
    const first = await drone.boundingBox();
    await page.waitForTimeout(150);
    expect(await drone.boundingBox()).toEqual(first);
    for (const i of [1, 2, 3]) {
      const b = await page.getByRole('button', { name: `Web drone ${i}` }).boundingBox();
      expect(b.x).toBeGreaterThanOrEqual(0);
      expect(b.x + b.width).toBeLessThanOrEqual(width);
      expect(b.y + b.height).toBeLessThanOrEqual(width === 320 ? 640 : 900);
    }
    await page.getByRole('button', { name: 'Web drone 1' }).click();
    await expect(page.getByRole('button', { name: 'Web drone 1' })).toBeDisabled();
  });
test('automated accessibility in start, map, encounter, and reading', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const check = async () => {
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(r.violations).toEqual([]);
  };
  await check();
  await page.getByRole('button', { name: 'ENTER', exact: true }).click();
  await check();
  await page.getByRole('button', { name: /ROOFTOP 01/ }).click();
  await check();
  await access(page, 'Profile');
  await check();
});
test('hidden tabs require an explicit resume and retain time', async ({ page }) => {
  await page.clock.install();
  await start(page);
  await page.clock.fastForward(3000);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.getByRole('dialog')).toContainText('MISSION PAUSED');
  const remaining = await page.getByTestId('timer').textContent();
  await page.clock.fastForward(40000);
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.getByRole('dialog')).toContainText('MISSION PAUSED');
  await page.getByRole('button', { name: 'Resume mission' }).click();
  await expect(page.getByTestId('timer')).toHaveText(remaining);
});
test.describe('touch controls', () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  test('three finger taps capture three drones', async ({ page }) => {
    await start(page);
    for (const i of [1, 2, 3]) await page.getByRole('button', { name: `Web drone ${i}` }).tap();
    await expect(page.getByRole('dialog')).toContainText('Vardhan Reddy');
  });
});
