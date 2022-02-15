import Card from './Card'

const Section = ({ videos, genre }) => {
  return (
    <section className="section">
      <h3>{genre}</h3>
      <div className="video-feed">
        {videos.map(video => <a key={video.id} href={`/video/${video.slug}`}>
          <Card thumbnail={video.thumbnail} />
        </a>)}
      </div>
    </section>
  )
}

export default Section