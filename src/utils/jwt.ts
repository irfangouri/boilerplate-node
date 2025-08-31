import jwt from 'jsonwebtoken';
import env from '../config/env';

interface TokenPayload {
  id: string,
  email: string,
}

export const generateToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, env.jwt.secret);
  return token;
};
