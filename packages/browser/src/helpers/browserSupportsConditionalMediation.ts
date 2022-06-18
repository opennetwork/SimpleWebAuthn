/* eslint-disable @typescript-eslint/ban-ts-comment */
export async function browserSupportsWebAuthnAutofill(): Promise<boolean> {
  // Just for Chrome Canary right now; the PublicKeyCredential logic below is the real API
  // @ts-ignore
  if (navigator.credentials.conditionalMediationSupported) {
    return true;
  }

  return (
    // @ts-ignore
    PublicKeyCredential.isConditionalMediationAvailable
    // @ts-ignore
    && PublicKeyCredential.isConditionalMediationAvailable()
  );
}
