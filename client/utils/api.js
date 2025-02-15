export async function fetchData(endpoint) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/${endpoint}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null; // Handle errors gracefully
  }
}
