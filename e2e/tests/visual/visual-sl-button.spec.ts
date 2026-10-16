import { test, expect } from "@playwright/test";
import fs from 'node:fs';
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

test.describe('sl-button visual', () => {
    test("button matches Figma export", async ({ page }, testInfo) => {
    await page.goto("http://localhost:4200/sl-button");

    const button = page.getByRole("button", {
        name: "Button",
    });

    await expect(button).toBeVisible();

    // Capture screenshot of the rendered button
    const actualBuffer = await button.screenshot();

    // Save temporarily
    fs.writeFileSync(
        testInfo.outputPath("actual-button.png"),
        actualBuffer
    );

    const actual = PNG.sync.read(actualBuffer);

    const expected = PNG.sync.read(
        fs.readFileSync(new URL("../assets/sl-button.png", import.meta.url))
    );

    await page.evaluate(() => document.fonts.ready);
    const fontFamily = await page.getByRole('button', { name: 'Button' }).evaluate(
        el => getComputedStyle(el).fontFamily
    );
    const fontWeight = await page.getByRole('button', { name: 'Button' }).evaluate(
        el => getComputedStyle(el).fontWeight
    );

    await expect(fontFamily).toBe("Roboto, sans-serif");
    await expect(fontWeight).toBe("600");

    await expect(actual.width).toBe(expected.width);
    await expect(actual.height).toBe(expected.height);

    const diff = new PNG({
        width: actual.width,
        height: actual.height,
    });

    const differentPixels = pixelmatch(
        expected.data,
        actual.data,
        diff.data,
        actual.width,
        actual.height,
        {
        threshold: 0.5,
        }
    );

    fs.writeFileSync(
        testInfo.outputPath("diff.png"),
        PNG.sync.write(diff)
    );

    expect(differentPixels).toBe(0);
    });
});
