/* eslint-disable @next/next/no-img-element */

import { gql, GraphQLClient } from 'graphql-request';
import Navbar from '../components/NavBar';

import Section from '../components/Section'

export const getStaticProps = async () => {
  const url = process.env.GRAPHCMS_ENDPOINT;
  const token = process.env.GRAPHCMS_TOKEN;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const query = gql`
    query {
      videos {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(query);
  const videos = data.videos;

  return {
    props: {
      videos
    }
  }
}

const Home = ({ videos }) => {
  const randomVideo = videos => videos[Math.floor(Math.random() * videos.length)];

  const filterVideos = (videos, genre) => {
    return videos.filter(video => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen === false || video.seen === null)
  }

  return (
    <>
      <div className="app">
        <Navbar />
        <div className="main-video">
          <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title}/>
        </div>
        <div className="video-feed">
          <Section genre={'Recommended for you'} videos={unSeenVideos(videos)} />
          <Section genre={'Family'} videos={filterVideos(videos, 'family')} />
          <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')} />
          <Section genre={'Classic'} videos={filterVideos(videos, 'classic')} />
          <Section genre={'Disney'} videos={filterVideos(videos, 'disney')} />
          <Section genre={'Marvel'} videos={filterVideos(videos, 'marvel')} />
        </div>
      </div>
    </>
  )
}

export default Home