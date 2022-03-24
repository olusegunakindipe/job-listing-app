import React, { useState } from "react";
import "./App.css";
import data from "./data.json";

interface Idata {
  id: number;
  company: string;
  logo: string;
  new: boolean,
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}
const App: React.FC = () => {
  const [dataArr] = useState<Idata[]>(data);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const path = process.env.PUBLIC_URL;
  const image = '/images/icon-remove.svg';

  const selectTag = (e: React.MouseEvent<HTMLElement>) => {
    let tagText = (e.target as HTMLElement).textContent as string;
        if (selectedTags?.includes(tagText)) {
      return;
    } else {
      setSelectedTags((prev) =>  prev ? [...prev, tagText] : [tagText]);
    }
  
  };

  const deleteSelectedTag = (event: React.MouseEvent<HTMLElement>) => {
    let tagText = (event.target as HTMLElement).parentNode as ParentNode;
    let tagContext = tagText.children[0].textContent;
    let leftOverItems =  selectedTags.filter((tag) => tag !== tagContext);
    setSelectedTags(leftOverItems);
  };

  const filteredItems = dataArr.filter((item) => {
    let test = Object.values(item).flat();
    return selectedTags.every((tag) => test.includes(tag)
    );
  
  });

  const clearTagList = () => {
    setSelectedTags([]);
  };

  

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        {selectedTags.length > 0 && (
          <section className="card selected-tags-section">
            <div className="tags selected-tags-container">
              {selectedTags.map((tag, index) => {
                return (
                  <div className="single-selected-tag" key={index}>
                    <div className="tag-btn">{tag}</div>
                    <button className="tag-delete-btn" onClick={(e) => deleteSelectedTag(e)}>
                      <img src={path + image} alt="remove" />
                    </button>
                  </div>
                );
              })}
            </div>
            <button className="tag-clear-btn" onClick={clearTagList}>
              Clear
            </button>
          </section>
        )}
        {filteredItems.map((item, index) => {
          return (
            <div className="card-wrapper" key={index}>
              <div className="left-accent"></div>
              <div className="card" key={item.id}>
                <div className="company-logo">
                  <img src={path + item.logo} alt="company" />
                </div>
                <div className="info-container">
                  <div className="company-header">
                    <h3 className="company-name">{item.company}</h3>
                    <div className="notification-container">
                      {item.new && <span className="notification new-noti">NEW!</span>}
                      {item.featured && <span className="notification feature-noti">FEATURED</span>}
                    </div>
                  </div>
                  <a href="/#" className="job-title">
                    {item.position}
                  </a>
                  <div className="post-info">
                    <ul>
                      <li>{item.postedAt}</li>
                      <li>{item.contract} </li>
                      <li>{item.location}</li>
                    </ul>
                  </div>
                </div>
                <div className="tags">
                  <button
                    onClick={(e) => {
                      selectTag(e);
                    }}
                    className="tag-btn"
                  >
                    {item.role}
                  </button>
                  <button
                    onClick={(e) => {
                      selectTag(e);
                    }}
                    className="tag-btn"
                  >
                    {item.level}
                  </button>
                  {item.languages.map((item, index) => {
                    return (
                      <button
                        className="tag-btn"
                        onClick={(e) => {
                          selectTag(e);
                        }}
                        key={index}
                      >
                        {item}
                      </button>
                    );
                  })}
                  {item.tools.map((item, index) => {
                    return (
                      <button
                        className="tag-btn"
                        key={index}
                        onClick={(e) => {
                          selectTag(e);
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
