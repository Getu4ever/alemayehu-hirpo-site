/** Authorize admin API requests with ADMIN_SECRET. */
export function assertAdminAuthorized(request: Request) {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) {
    throw new Error(
      "ADMIN_SECRET is not set. Add it to .env.local to enable admin tools.",
    );
  }
  const header = request.headers.get("x-admin-secret");
  const url = new URL(request.url);
  const query = url.searchParams.get("secret");
  if (header !== secret && query !== secret) {
    throw new Error("Unauthorized");
  }
}
