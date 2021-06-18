import { useEffect, useState } from "react";
import Newscard from "./newscard";

export default function News() {
  const [newsData, setnewsData] = useState([]);

  useEffect(async () => {
    let res = await fetch(
      "https://content.guardianapis.com/search?show-fields=all&page=1&page-size=60&q=covid%20AND%20india&from-date=2021-05-05&api-key=1aaec247-7620-4a4c-8699-7cd6777a7705"
    );
    let data = await res.json();
    setnewsData(data.response.results);
  }, []);

  return (
    <>
      <div className="news-container-title">
        <h1>Latest News</h1>
      </div>
      <div className="news-container">
        {newsData.map((item) => {
          return (
            <Newscard
              key={item.webUrl}
              webUrl={item.webUrl}
              trailText={item.fields.trailText}
              title={item.fields.headline}
              img={item.fields.thumbnail}
            />
          );
        })}
      </div>
    </>
  );
}
