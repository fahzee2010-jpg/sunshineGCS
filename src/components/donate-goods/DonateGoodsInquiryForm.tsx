"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { TextLink } from "@/components/ui/TextLink";
import {
  CONDITION_LABELS,
  CONDITIONS,
  CONTACT_METHOD_LABELS,
  CONTACT_METHODS,
  FIELD_LIMITS,
  FOOD_CATEGORIES,
  FOOD_CATEGORY_LABELS,
  HONEYPOT_FIELD,
  PRODUCT_TYPE_LABELS,
  PRODUCT_TYPES,
  TURNSTILE_FIELD,
} from "@/lib/inquiries/constants";
import type { ClientInquiryResult } from "@/lib/inquiries/client-result";
import type {
  DonateGoodsInquiryInput,
  FieldErrors,
} from "@/lib/inquiries/types";
import {
  emptyInquiryInput,
  validateDonateGoodsInquiry,
} from "@/lib/inquiries/validation";
import { cn } from "@/lib/cn";

const INQUIRY_API_PATH = "/api/inquiry";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function describedBy(
  id: string,
  opts: { help?: boolean; error?: boolean },
): string | undefined {
  const parts: string[] = [];
  if (opts.error) parts.push(`${id}-error`);
  // Only reference help when it is actually rendered (FormField hides help on error).
  if (opts.help && !opts.error) parts.push(`${id}-help`);
  return parts.length ? parts.join(" ") : undefined;
}

export function DonateGoodsInquiryForm() {
  const formId = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<DonateGoodsInquiryInput>(emptyInquiryInput);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<ClientInquiryResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errors]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current) {
      return;
    }

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainerRef.current) {
        return;
      }

      if (turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }

      turnstileWidgetIdRef.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
        },
      );
    };

    if (window.turnstile) {
      renderWidget();
      return () => {
        if (turnstileWidgetIdRef.current && window.turnstile) {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        }
      };
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="challenges.cloudflare.com/turnstile"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", renderWidget);
      return () => {
        existingScript.removeEventListener("load", renderWidget);
        if (turnstileWidgetIdRef.current && window.turnstile) {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        }
      };
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = renderWidget;
    document.head.appendChild(script);

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }
    };
  }, []);

  function updateField<K extends keyof DonateGoodsInquiryInput>(
    key: K,
    value: DonateGoodsInquiryInput[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const clientValidation = validateDonateGoodsInquiry(values);
    if (!clientValidation.ok) {
      setErrors(clientValidation.errors);
      setResult(null);
      return;
    }

    if (!TURNSTILE_SITE_KEY) {
      setFormError(
        "We couldn't submit your inquiry right now. Please try again later.",
      );
      setResult(null);
      return;
    }

    const turnstileToken = window.turnstile?.getResponse(
      turnstileWidgetIdRef.current ?? undefined,
    );

    if (!turnstileToken) {
      setFormError(
        "We couldn't submit your inquiry right now. Please try again later.",
      );
      setResult(null);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    payload[TURNSTILE_FIELD] = turnstileToken;

    startTransition(async () => {
      let response: ClientInquiryResult;

      try {
        const apiResponse = await fetch(INQUIRY_API_PATH, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        response = (await apiResponse.json()) as ClientInquiryResult;
      } catch {
        setFormError(
          "We couldn't submit your inquiry right now. Please try again later.",
        );
        setResult(null);
        return;
      }

      if (response.status === "validation_error") {
        setErrors(response.errors);
        setResult(null);
        return;
      }

      if (response.status === "rate_limited" || response.status === "error") {
        setFormError(
          "We couldn't submit your inquiry right now. Please try again later.",
        );
        setResult(null);
        return;
      }

      setErrors({});
      setResult(response);
      window.turnstile?.reset(turnstileWidgetIdRef.current ?? undefined);
    });
  }

  if (result?.status === "success") {
    return (
      <div
        className="rounded-lg border border-border bg-surface p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <h3 className="text-h3 mb-3">Thank you for contacting Sunshine.</h3>
        <p className="text-body mb-4 text-ink-muted">
          We received your donation inquiry. Our team will review the
          information provided and, when appropriate, contact you to discuss
          next steps. Submitting an inquiry does not guarantee acceptance of
          the donation.
        </p>
        {result.delivery === "development_accepted" ? (
          <p className="alert alert-info mb-6">
            Development note: email delivery is not configured. This inquiry was
            validated locally and was <strong>not emailed</strong>.
          </p>
        ) : null}
        <ul className="flex flex-wrap gap-3">
          <li>
            <Button href="/donate-goods" variant="outline">
              Back to Donate Goods
            </Button>
          </li>
          <li>
            <Button href="/" variant="ghost">
              Home
            </Button>
          </li>
        </ul>
      </div>
    );
  }

  const errorEntries = Object.entries(errors) as Array<
    [keyof DonateGoodsInquiryInput, string]
  >;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8"
      aria-describedby={formError ? `${formId}-form-error` : undefined}
    >
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) =>
            updateField("companyWebsite", event.target.value)
          }
        />
      </div>

      {errorEntries.length > 0 ? (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          className="alert alert-error"
          role="alert"
          aria-labelledby={`${formId}-error-summary-title`}
        >
          <p id={`${formId}-error-summary-title`} className="font-semibold">
            Please correct the following:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorEntries.map(([key, message]) => (
              <li key={key}>
                <a href={`#${key}`} className="underline">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {formError ? (
        <div
          id={`${formId}-form-error`}
          className="alert alert-error"
          role="alert"
        >
          {formError}
        </div>
      ) : null}

      <fieldset className="space-y-5">
        <legend className="text-h4 mb-2">Company information</legend>

        <FormField
          id="companyName"
          label="Company name"
          required
          error={errors.companyName}
        >
          <Input
            id="companyName"
            name="companyName"
            autoComplete="organization"
            required
            maxLength={FIELD_LIMITS.companyName}
            value={values.companyName}
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={describedBy("companyName", {
              error: Boolean(errors.companyName),
            })}
            onChange={(event) => updateField("companyName", event.target.value)}
          />
        </FormField>

        <FormField
          id="contactPerson"
          label="Contact person"
          required
          error={errors.contactPerson}
        >
          <Input
            id="contactPerson"
            name="contactPerson"
            autoComplete="name"
            required
            maxLength={FIELD_LIMITS.contactPerson}
            value={values.contactPerson}
            aria-invalid={Boolean(errors.contactPerson)}
            aria-describedby={describedBy("contactPerson", {
              error: Boolean(errors.contactPerson),
            })}
            onChange={(event) =>
              updateField("contactPerson", event.target.value)
            }
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="email" label="Email" required error={errors.email}>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={FIELD_LIMITS.email}
              value={values.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email", {
                error: Boolean(errors.email),
              })}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </FormField>

          <FormField id="phone" label="Phone" required error={errors.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              maxLength={FIELD_LIMITS.phone}
              value={values.phone}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone", {
                error: Boolean(errors.phone),
                help: true,
              })}
              onChange={(event) => updateField("phone", event.target.value)}
            />
            {!errors.phone ? (
              <p id="phone-help" className="form-help">
                Include country code if outside the United States.
              </p>
            ) : null}
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-h4 mb-2">Donation information</legend>

        <FormField
          id="productType"
          label="Product type"
          required
          error={errors.productType}
          helpText="Selecting a category does not mean Sunshine can accept these goods."
        >
          <Select
            id="productType"
            name="productType"
            required
            value={values.productType}
            aria-invalid={Boolean(errors.productType)}
            aria-describedby={describedBy("productType", {
              error: Boolean(errors.productType),
              help: true,
            })}
            onChange={(event) =>
              updateField(
                "productType",
                event.target.value as DonateGoodsInquiryInput["productType"],
              )
            }
          >
            <option value="">Select a product type</option>
            {PRODUCT_TYPES.map((type) => (
              <option key={type} value={type}>
                {PRODUCT_TYPE_LABELS[type]}
              </option>
            ))}
          </Select>
        </FormField>

        {values.productType === "other" ? (
          <FormField
            id="productTypeOther"
            label="Describe the product type"
            required
            error={errors.productTypeOther}
          >
            <Input
              id="productTypeOther"
              name="productTypeOther"
              required
              maxLength={FIELD_LIMITS.productTypeOther}
              value={values.productTypeOther}
              aria-invalid={Boolean(errors.productTypeOther)}
              aria-describedby={describedBy("productTypeOther", {
                error: Boolean(errors.productTypeOther),
              })}
              onChange={(event) =>
                updateField("productTypeOther", event.target.value)
              }
            />
          </FormField>
        ) : (
          <input type="hidden" name="productTypeOther" value="" />
        )}

        <FormField
          id="approximateQuantity"
          label="Approximate quantity"
          required
          error={errors.approximateQuantity}
          helpText="For example: 50 cases, 3 pallets, or approximately 1,000 units."
        >
          <Input
            id="approximateQuantity"
            name="approximateQuantity"
            required
            maxLength={FIELD_LIMITS.approximateQuantity}
            value={values.approximateQuantity}
            aria-invalid={Boolean(errors.approximateQuantity)}
            aria-describedby={describedBy("approximateQuantity", {
              error: Boolean(errors.approximateQuantity),
              help: true,
            })}
            onChange={(event) =>
              updateField("approximateQuantity", event.target.value)
            }
          />
        </FormField>

        <FormField
          id="location"
          label="Pickup or delivery location"
          required
          error={errors.location}
          helpText="Provide enough detail for review. Submitting a location does not promise pickup."
        >
          <Input
            id="location"
            name="location"
            required
            maxLength={FIELD_LIMITS.location}
            value={values.location}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={describedBy("location", {
              error: Boolean(errors.location),
              help: true,
            })}
            onChange={(event) => updateField("location", event.target.value)}
          />
        </FormField>

        <FormField
          id="condition"
          label="Condition"
          required
          error={errors.condition}
          helpText="Condition does not automatically qualify goods for acceptance."
        >
          <Select
            id="condition"
            name="condition"
            required
            value={values.condition}
            aria-invalid={Boolean(errors.condition)}
            aria-describedby={describedBy("condition", {
              error: Boolean(errors.condition),
              help: true,
            })}
            onChange={(event) =>
              updateField(
                "condition",
                event.target.value as DonateGoodsInquiryInput["condition"],
              )
            }
          >
            <option value="">Select condition</option>
            {CONDITIONS.map((condition) => (
              <option key={condition} value={condition}>
                {CONDITION_LABELS[condition]}
              </option>
            ))}
          </Select>
        </FormField>

        {values.condition === "other" ? (
          <FormField
            id="conditionOther"
            label="Describe the condition"
            required
            error={errors.conditionOther}
          >
            <Input
              id="conditionOther"
              name="conditionOther"
              required
              maxLength={FIELD_LIMITS.conditionOther}
              value={values.conditionOther}
              aria-invalid={Boolean(errors.conditionOther)}
              aria-describedby={describedBy("conditionOther", {
                error: Boolean(errors.conditionOther),
              })}
              onChange={(event) =>
                updateField("conditionOther", event.target.value)
              }
            />
          </FormField>
        ) : (
          <input type="hidden" name="conditionOther" value="" />
        )}

        <fieldset
          className={cn(
            "rounded-md border border-border p-4",
            errors.foodCategory && "border-error",
          )}
          aria-describedby={describedBy("foodCategory", {
            error: Boolean(errors.foodCategory),
          })}
          aria-invalid={Boolean(errors.foodCategory) || undefined}
        >
          <legend className="form-label px-1">
            Food / non-food <span className="text-error" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </legend>
          <div className="mt-2 space-y-2">
            {FOOD_CATEGORIES.map((category) => (
              <label key={category} className="form-check">
                <input
                  className="form-check-input rounded-full"
                  type="radio"
                  name="foodCategory"
                  value={category}
                  checked={values.foodCategory === category}
                  onChange={() => updateField("foodCategory", category)}
                />
                <span className="text-body">{FOOD_CATEGORY_LABELS[category]}</span>
              </label>
            ))}
          </div>
          {errors.foodCategory ? (
            <p id="foodCategory-error" className="form-error" role="alert">
              {errors.foodCategory}
            </p>
          ) : null}
        </fieldset>

        <FormField
          id="photoDescription"
          label="Photos (optional)"
          error={errors.photoDescription}
          helpText="Secure photo upload is not enabled yet. Briefly describe the goods or note that photos are available on request."
        >
          <Textarea
            id="photoDescription"
            name="photoDescription"
            rows={3}
            maxLength={FIELD_LIMITS.photoDescription}
            value={values.photoDescription}
            aria-invalid={Boolean(errors.photoDescription)}
            aria-describedby={describedBy("photoDescription", {
              error: Boolean(errors.photoDescription),
              help: true,
            })}
            onChange={(event) =>
              updateField("photoDescription", event.target.value)
            }
          />
        </FormField>

        <fieldset
          className={cn(
            "rounded-md border border-border p-4",
            errors.preferredContactMethod && "border-error",
          )}
          aria-describedby={describedBy("preferredContactMethod", {
            error: Boolean(errors.preferredContactMethod),
          })}
        >
          <legend className="form-label px-1">
            Preferred contact method{" "}
            <span className="text-error" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </legend>
          <div className="mt-2 space-y-2">
            {CONTACT_METHODS.map((method) => (
              <label key={method} className="form-check">
                <input
                  className="form-check-input rounded-full"
                  type="radio"
                  name="preferredContactMethod"
                  value={method}
                  checked={values.preferredContactMethod === method}
                  onChange={() => updateField("preferredContactMethod", method)}
                />
                <span className="text-body">{CONTACT_METHOD_LABELS[method]}</span>
              </label>
            ))}
          </div>
          {errors.preferredContactMethod ? (
            <p
              id="preferredContactMethod-error"
              className="form-error"
              role="alert"
            >
              {errors.preferredContactMethod}
            </p>
          ) : null}
        </fieldset>

        <FormField
          id="additionalDetails"
          label="Additional details"
          error={errors.additionalDetails}
          helpText="Optional: packaging, timing, logistics, or other useful details. Do not include passwords, payment information, or other highly sensitive personal information."
        >
          <Textarea
            id="additionalDetails"
            name="additionalDetails"
            rows={5}
            maxLength={FIELD_LIMITS.additionalDetails}
            value={values.additionalDetails}
            aria-invalid={Boolean(errors.additionalDetails)}
            aria-describedby={describedBy("additionalDetails", {
              error: Boolean(errors.additionalDetails),
              help: true,
            })}
            onChange={(event) =>
              updateField("additionalDetails", event.target.value)
            }
          />
        </FormField>
      </fieldset>

      <div className="space-y-4 rounded-lg border border-border bg-sunshine-cream p-4 sm:p-5">
        <p className="text-body-sm text-charcoal">
          Please provide only the information needed for us to review your
          donation inquiry. We will use the information you submit to evaluate
          the inquiry and communicate with you about the opportunity. Do not
          include passwords, payment information, or other highly sensitive
          personal information. See our{" "}
          <TextLink href="/privacy">Privacy</TextLink> page for more
          information as it becomes available.
        </p>
        <p className="text-body-sm font-medium text-charcoal">
          Submitting this inquiry does not guarantee that Sunshine Global
          Community Services can accept the donation. Each opportunity is
          reviewed individually based on factors including product type,
          condition, quantity, location, timing, program needs, logistics, and
          applicable requirements.
        </p>
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div
          ref={turnstileContainerRef}
          className="min-h-[65px]"
          aria-label="Security verification"
        />
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          variant="primary"
          disabled={isPending || !TURNSTILE_SITE_KEY}
        >
          {isPending ? "Submitting inquiry…" : "Submit Donation Inquiry"}
        </Button>
        <p className="text-body-sm" aria-live="polite">
          {isPending ? "Please wait while we submit your inquiry." : null}
        </p>
      </div>
    </form>
  );
}
