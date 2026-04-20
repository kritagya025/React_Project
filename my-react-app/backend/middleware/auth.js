import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ideaforge_jwt_secret_key_2026_change_me";

/**
 * Middleware that verifies the JWT token from the Authorization header.
 * Sets req.userId on success, returns 401 on failure.
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required. Please log in." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
  }
}

/**
 * Optional auth — sets req.userId if a valid token is present, but does NOT
 * block the request if no token is found.
 */
export function optionalAuth(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
    } catch {
      // Token invalid — proceed without user context
    }
  }

  next();
}

/**
 * Generate a signed JWT for a given user ID.
 */
export function signToken(userId) {
  return jwt.sign({ userId: String(userId) }, JWT_SECRET, { expiresIn: "7d" });
}
