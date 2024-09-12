"use client"

import {Article, NewsApiResponse} from '@/app/types'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const API_KEY = '4254db688f184281ad04fc136c40c4aa';
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=SEO&apiKey=${API_KEY}`;

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les articles
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get<NewsApiResponse>(NEWS_API_URL);
      setArticles(response.data.articles);
    } catch (err) {
      setError('Erreur lors de la récupération des articles');
    } finally {
      setLoading(false);
    }
  };

  // Charger les articles une seule fois au montage du composant
  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <div>Chargement des articles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Dernières Actualités</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Lire plus
            </a>
            {article.urlToImage && <Image src={article.urlToImage} alt={article.title} width={200} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
