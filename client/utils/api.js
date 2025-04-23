/**
 * Generic function to fetch JSON data.
 * Supports both server-side (fs) and client-side (fetch) environments.
 *
 * @param {string} fileName - The name of the JSON file without extension (e.g., 'residential').
 * @returns {Promise<Object>} - An object containing projects, frontImages, and category.
 */
export async function fetchData(fileName) {
  console.log(fileName);
  try {
    // Validate fileName
    if (!fileName || typeof fileName !== "string") {
      throw new Error("Invalid file name provided.");
    }

    // Format file name: lowercase first letter + Data.json
    const formattedFileName = `${fileName.charAt(0).toLowerCase()}${fileName.slice(1)}Data.json`;

    let dataJson;

    if (typeof window === "undefined") {
      // Server-side: Use fs to read local files
      const fs = (await import("fs")).default;
      const path = (await import("path")).default;

      const filePath = path.join(
        process.cwd(),
        "public",
        "data",
        formattedFileName
      );
      const fileContent = fs.readFileSync(filePath, "utf-8");
      dataJson = JSON.parse(fileContent);
    } else {
      // Client-side: Use fetch to get the file
      const url = `/data/${formattedFileName}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${formattedFileName}: ${response.statusText}`
        );
      }

      dataJson = await response.json();
    }

    // ✅ Return the structured data as required
    return {
      projects: dataJson?.projects || {},
      frontImages: Object.values(dataJson.projects || {})
        .map((project) => project?.[0])
        .filter((img) => img && img.trim() !== ""),
      category: dataJson.category || "Default Category",
    };
  } catch (error) {
    console.error(`Error fetching data for ${fileName}:`, error.message);

    // Fallback return on error
    return {
      projects: {},
      frontImages: [],
      category: "",
    };
  }
}
