export default async function handler(req, res) {
    const { id } = req.query;

    const response = await fetch(
      `https://api.unsplash.com/photos/${id}/download`,
      {
        headers: {
          Authorization: `Client-ID ${"DZWyfKARwR58TrdDvVVrXSxEpBg7Z8nzvUcfCZv-YyI"}`,
        },
      }
    );

    const data = await response.json();
    res.json({ downloadUrl: data.url });
}