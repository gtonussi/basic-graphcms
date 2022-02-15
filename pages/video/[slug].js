/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import {useState} from 'react';
import { gql, GraphQLClient } from 'graphql-request';

export const getServerSideProps = async (pageContext) => {
  const url = process.env.GRAPHCMS_ENDPOINT;
  const token = process.env.GRAPHCMS_TOKEN;

  const pageSlug = pageContext.query.slug;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const query = gql`
    query($pageSlug: String!) {
      video(where: {
        slug: $pageSlug
      }) {
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

  const variables = {
    pageSlug
  }

  const data = await graphQLClient.request(query, variables);
  const video = data.video;

  return {
    props: {
      video
    }
  }
}

const Video = ({ video }) => {

  const [watching, setWatching] = useState(false)
  
  return (
    <>
      {!watching && <>
        <img className="video-image" src={video.thumbnail.url} alt={video.title} />
        <div className="info">
          <p>{video.tags.join(', ')}</p>
          <p>{video.description}</p>
          <a href="/"><p>Go back</p></a>
          <button 
            className="video-overlay"
            onClick={() => {
              watching ? setWatching(false) : setWatching(true)
            }}
          >PLAY</button>
        </div>
      </>}
      
      {watching && (
        <video width='100%' controls>
          <source src={video.mp4.url} type="video/mp4" />
        </video>
      )}

      <div 
        className="info-footer"
        onClick={() => {
          watching ? setWatching(false) : null
        }}
      ></div>
    </>
  )
}

export default Video