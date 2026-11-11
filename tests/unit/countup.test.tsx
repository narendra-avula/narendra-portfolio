// @vitest-environment node
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { CountUp } from "@/components/motion";

describe("CountUp", () => {
  it("server-renders the final value, not 0 (audit I-2)", () => {
    // React separates adjacent text nodes with <!-- --> markers; compare visible text
    const html = renderToString(<CountUp to={11} suffix="+" />).replace(/<!-- -->/g, "");
    expect(html).toContain("11+");
    expect(html).not.toMatch(/>0</);
  });
});
