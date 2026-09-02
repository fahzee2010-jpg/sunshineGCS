import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isAllowedOrigin } from "./origin";

describe("isAllowedOrigin", () => {
  it("allows the configured production origin", () => {
    assert.equal(
      isAllowedOrigin(
        "https://sunshineservices.org",
        null,
        "https://sunshineservices.org",
        "production",
      ),
      true,
    );
  });

  it("rejects unknown origins in production", () => {
    assert.equal(
      isAllowedOrigin(
        "https://evil.example",
        null,
        "https://sunshineservices.org",
        "production",
      ),
      false,
    );
  });

  it("allows localhost during non-production development", () => {
    assert.equal(
      isAllowedOrigin(
        "http://localhost:8788",
        null,
        "https://sunshineservices.org",
        "development",
      ),
      true,
    );
  });
});
