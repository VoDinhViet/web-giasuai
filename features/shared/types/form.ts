import type { ReactFormExtendedApi } from "@tanstack/react-form";

export type LooseReactFormApi<TFormData> = ReactFormExtendedApi<
  TFormData,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

export type FormStateOf<TFormApi extends { state: unknown }> = TFormApi["state"];

export type FormValuesOf<TFormApi extends { state: { values: unknown } }> =
  TFormApi["state"]["values"];
