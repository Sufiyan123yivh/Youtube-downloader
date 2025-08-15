export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, type, format, quality } = req.body;
    
    if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    // For now, return an error explaining the limitation
    return res.status(503).json({ 
      error: 'YouTube downloading is currently unavailable due to API restrictions. This is a demo version.' 
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Download service temporarily unavailable' });
  }
}
