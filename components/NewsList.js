import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

/*const sampleArticle = {
    title: '제목',
    description: '내용',
    url: 'https://bamtory29.tistory.com/',
    urlToImage: 'https://via.placeholder.com/160',
}*/

const NewsList = ({category}) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

   useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const res = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=d6e76706631d4059b20e981f9fc9b930`
                );

                setArticles(res.data.articles);
            }
            catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);

    if (loading) {
        return <NewsListBlock>로딩 중...</NewsListBlock>;
    }

    if (!articles) {
        return null;
    }

    return (
        <NewsListBlock>
            {articles.map(article => {
                return <NewsItem key={article.url} article={article}/>;
            })}
        </NewsListBlock>
    );
};

export default NewsList;