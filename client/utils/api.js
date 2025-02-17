export async function fetchData(endpoint) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/data/${endpoint}`;
    console.log(`Fetching: ${url}`);

    const res = await fetch(url);

    console.log("Response Status:", res.status, res.statusText);

    if (!res.ok) {
      const errorMessage = `Failed to fetch ${endpoint}: ${res.statusText} (Status: ${res.status})`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn(`Expected JSON but received: ${contentType}`);
      const rawResponse = await res.text();
      console.warn("Raw Response:", rawResponse);
      throw new Error(`Invalid JSON response for ${endpoint}`);
    }

    const data = await res.json();
    console.log("Fetched Data:", data); // ✅ Debugging fetched data
    return data;
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error.message);
    return null; // Prevents app from crashing
  }
}
