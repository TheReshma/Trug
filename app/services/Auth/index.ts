

export const logout = async () => {
  const res = await fetch(
    `/api/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (res.ok) {
    const data = await res.json();
    return true;
  } else {
    return false;
  }
}