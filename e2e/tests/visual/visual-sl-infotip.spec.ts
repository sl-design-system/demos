import { test, expect } from "@playwright/test";
import fs from 'node:fs';
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

test.describe('sl-infotip visual', () => {
    test.use({ deviceScaleFactor: 1 });

    test("infotip matches Figma export", async ({ page }, testInfo) => {
    await page.goto("http://localhost:4200/sl-infotip");

    const button = page.getByRole("button", {
        name: "More information",
    });

    await expect(button).toBeVisible();

    // Capture screenshot of the rendered infotip button
    const actualBuffer = await button.screenshot({
        scale: 'device',
    });

    // Save temporarily
    fs.writeFileSync(
        testInfo.outputPath("actual-infotip.png"),
        actualBuffer
    );

    const actual = PNG.sync.read(actualBuffer);

    const expected = PNG.sync.read(
        fs.readFileSync(new URL("../assets/sl-infotip.png", import.meta.url))
    );

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
        threshold: 0.8,
        }
    );

    fs.writeFileSync(
        testInfo.outputPath("diff-infotip.png"),
        PNG.sync.write(diff)
    );

    expect(differentPixels).toBe(0);
    });
});
