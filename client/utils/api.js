export async function fetchData(endpoint) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/${endpoint}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON but received ${contentType}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error.message);
    return null; // Return null to prevent app crashes
  }
}
