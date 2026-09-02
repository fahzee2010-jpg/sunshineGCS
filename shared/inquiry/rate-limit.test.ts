import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkInquiryRateLimits } from "./rate-limit";

describe("checkInquiryRateLimits", () => {
  it("allows when no bindings are configured", async () => {
    assert.equal(await checkInquiryRateLimits("key-a", {}), true);
  });

  it("blocks when the Rate Limit binding rejects the burst", async () => {
    const allowed = await checkInquiryRateLimits("key-b", {
      rateLimiter: {
        async limit() {
          return { success: false };
        },
      },
    });
    assert.equal(allowed, false);
  });

  it("checks KV after a successful burst check", async () => {
    const store = new Map<string, string>();
    const kv = {
      async get(key: string) {
        return store.get(key) ?? null;
      },
      async put(key: string, value: string) {
        store.set(key, value);
      },
    } as unknown as KVNamespace;

    for (let i = 0; i < 5; i += 1) {
      assert.equal(
        await checkInquiryRateLimits("key-c", {
          rateLimiter: {
            async limit() {
              return { success: true };
            },
          },
          kv,
        }),
        true,
      );
    }

    assert.equal(
      await checkInquiryRateLimits("key-c", {
        rateLimiter: {
          async limit() {
            return { success: true };
          },
        },
        kv,
      }),
      false,
    );
  });
});
