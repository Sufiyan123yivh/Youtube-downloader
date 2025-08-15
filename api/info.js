const ytdl = require('ytdl-core');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const info = await ytdl.getInfo(url);
    const videoDetails = info.videoDetails;

    res.json({
      title: videoDetails.title,
      duration: parseInt(videoDetails.lengthSeconds),
      view_count: parseInt(videoDetails.viewCount),
      uploader: videoDetails.author.name,
      upload_date: videoDetails.publishDate
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch video info' });
  }
}
