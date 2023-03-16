import { verifyJWT } from './verifyJWT';
import { convertPEMToBytes } from '../helpers/convertPEMToBytes';
import { Apple_WebAuthn_Root_CA } from '../services/defaultRootCerts/apple';

const leafCert = convertPEMToBytes(
  '-----BEGIN CERTIFICATE-----\nMIIDAzCCAqigAwIBAgIPBFTYzwOQmHjntsvY0AGOMAoGCCqGSM49BAMCMG8xCzAJ\nBgNVBAYTAlVTMRYwFAYDVQQKDA1GSURPIEFsbGlhbmNlMS8wLQYDVQQLDCZGQUtF\nIE1ldGFkYXRhIDMgQkxPQiBJTlRFUk1FRElBVEUgRkFLRTEXMBUGA1UEAwwORkFL\nRSBDQS0xIEZBS0UwHhcNMTcwMjAxMDAwMDAwWhcNMzAwMTMxMjM1OTU5WjCBjjEL\nMAkGA1UEBhMCVVMxFjAUBgNVBAoMDUZJRE8gQWxsaWFuY2UxMjAwBgNVBAsMKUZB\nS0UgTWV0YWRhdGEgMyBCTE9CIFNpZ25pbmcgU2lnbmluZyBGQUtFMTMwMQYDVQQD\nDCpGQUtFIE1ldGFkYXRhIDMgQkxPQiBTaWduaW5nIFNpZ25lciA0IEZBS0UwWTAT\nBgcqhkjOPQIBBggqhkjOPQMBBwNCAATL3eRNA9YIQ3mAsHfcO3x0rHxqg3xkQUb2\nE4Mo39L6SLXnz82D5Nnq+59Ah1hNfL5OEtxdgy+/kIJyiScl4+T8o4IBBTCCAQEw\nCwYDVR0PBAQDAgbAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFPl4RxJ2M8prAEvq\nnSFK4+3nN8SqMB8GA1UdIwQYMBaAFKOEp6Rkook8Cr8XnqIN8BIaptfLMEgGA1Ud\nHwRBMD8wPaA7oDmGN2h0dHBzOi8vbWRzMy5jZXJ0aW5mcmEuZmlkb2FsbGlhbmNl\nLm9yZy9jcmwvTURTQ0EtMS5jcmwwWgYDVR0gBFMwUTBPBgsrBgEEAYLlHAEDATBA\nMD4GCCsGAQUFBwIBFjJodHRwczovL21kczMuY2VydGluZnJhLmZpZG9hbGxpYW5j\nZS5vcmcvcmVwb3NpdG9yeTAKBggqhkjOPQQDAgNJADBGAiEAxIq00OoEowGSIlqP\nzVQtqKTgCJpqSHu3NYZHgQIIbKICIQCZYm9Z0KnEhzWIc0bwa0sLfZ/AMJ8vhM5B\n1jrz8mgmBA==\n-----END CERTIFICATE-----\n'
);

test('should verify MDS blob', async () => {
  const verified = await verifyJWT(blob, leafCert);

  expect(verified).toEqual(true);
});

test('should fail to verify a JWT with a bad signature', async () => {
  const badSig = blob.substring(0, blob.length - 1);

  const verified = await verifyJWT(badSig, leafCert);

  expect(verified).toEqual(false);
});

test('should fail to verify when leaf cert contains unexpected public key', async () => {
  const verified = await verifyJWT(
    blob,
    convertPEMToBytes(Apple_WebAuthn_Root_CA),
  );

  expect(verified).toEqual(false);
});