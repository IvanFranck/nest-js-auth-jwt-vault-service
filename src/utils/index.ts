export const extractPrivateKey = (input: string): string | null => {
  const regex =
    /-----BEGIN ENCRYPTED PRIVATE KEY-----(.*?)-----END ENCRYPTED PRIVATE KEY-----/s;
  const match = input.match(regex);

  if (match && match[1]) {
    return match[1].trim();
  } else {
    return null;
  }
};

export const extractPublicKey = (input: string): string | null => {
  const regex = /-----BEGIN PUBLIC KEY-----(.*?)-----END PUBLIC KEY-----/s;
  const match = input.match(regex);

  if (match && match[1]) {
    return match[1].trim();
  } else {
    return null;
  }
};
