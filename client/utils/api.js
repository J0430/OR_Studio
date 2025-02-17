export async function fetchData(endpoint) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/data/${endpoint}`;
    console.log(`Fetching: ${url}`);

    const res = await fetch(url);
    console.log("Response Status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
    }

    // Validate response content type
    const contentType = res.headers.get("content-type");
    console.log("Content-Type:", contentType);

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON but received ${contentType}`);
    }

    // Ensure JSON parsing is safe
    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      throw new Error(`Failed to parse JSON for ${endpoint}`);
    }

    console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error.message);
    return { error: error.message }; // Return an error object instead of null
  }
}
