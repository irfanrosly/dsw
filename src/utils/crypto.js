import { JSEncrypt } from 'jsencrypt';

// encryption using public key
// returns ciphertext in base64
export const encrypt = data => {
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPublicKey(publicKey);
  return jsencrypt.encrypt(data);
};
