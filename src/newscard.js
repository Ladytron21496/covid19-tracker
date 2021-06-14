export default function Newscard(props) {
  let { img, trailText, title, webUrl } = props;

  if (img == undefined || trailText == undefined || title == undefined) {
    return null;
  }

  let handleClick = () => {
    window.location = webUrl;
  };

  return (
    <div className="news-card-container">
      <img className="news-image" src={img}></img>
      <div className="card-body">
        <p className="news-title">{title}</p>
        <p className="news-trail-text">{trailText}</p>
      </div>
      <div className="news-button-container">
        <button onClick={handleClick} className="news-button">
          Read More
        </button>
      </div>
    </div>
  );
}
