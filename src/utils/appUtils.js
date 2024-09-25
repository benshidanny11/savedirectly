import { Buffer } from 'buffer';

export const generateBase64 = (phone, password)=>{

  const buf = Buffer.from(`${phone}:${password}`, 'utf8');
  return  buf.toString('base64');

};
