import jwt from 'jsonwebtoken';

export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth');
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      event.context.user = decoded;
    } catch (err) {
      deleteCookie(event, 'auth');
    }
  }
});