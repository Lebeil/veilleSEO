import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
}

const RssScraper: React.FC = () => {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        // URL du flux RSS (Google Alerts)
        const rssUrl = 'https://www.google.fr/alerts/feeds/06170895654035051437/18187601709831917352';

        // Récupérer les données en XML
        const response = await axios.get(rssUrl, {
          headers: {
            'Content-Type': 'application/xml',
          },
        });

        // Convertir les données XML en JSON
        const result = await parseStringPromise(response.data, { trim: true });

        // Extraire les articles RSS
        const items = result?.rss?.channel[0]?.item?.map((item: any) => ({
          title: item.title[0],
          link: item.link[0],
          pubDate: item.pubDate[0],
        }));

        setItems(items);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch RSS feed.');
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Google Alerts RSS Feed</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            <p>{new Date(item.pubDate).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RssScraper;
