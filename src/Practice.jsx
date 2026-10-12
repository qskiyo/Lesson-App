import { useState } from "react";

function Practice() {
  const [lessons, setLessons] = useState([
    {
      lesson: "01, Introduction to HTML",
      description: "In this topic, you'll get the roadmap of everything you need to learn HTML",
      isLocked: false,
      isCompleted: false,
      details:
        "HTML stands for HyperText Markup Language. It is the standard language used to structure content on the web. Every web page is built using elements like headings, paragraphs, links, images, and lists. In this lesson, you will learn how HTML gives meaning to content so browsers can display it correctly and developers can organize information clearly."
    },
    {
      lesson: "02, VS Code & Tags",
      description: "In this topic, you'll learn about the most used text editor and features",
      isLocked: true,
      isCompleted: false,
      details:
        "VS Code is a lightweight but powerful code editor used by developers to write and organize files efficiently. It offers features like autocomplete, syntax highlighting, extensions, and a built-in terminal, which make coding faster and easier. HTML tags are the building blocks of web pages, and each tag has a purpose. For example, h1 creates a heading, p creates a paragraph, and img inserts an image. Understanding tags is the first step toward creating real web pages."
    },
    {
      lesson: "03, Live Server and Headings",
      description: "In this topic, you'll learn about the live server and headings in HTML",
      isLocked: true,
      isCompleted: false,
      details:
        "Live Server is a VS Code extension that lets you preview your webpage in the browser instantly whenever you save changes. This makes the development process much faster because you can see updates in real time without refreshing manually. Headings are important HTML elements used to organize page content from the most important topic to the least important. They help both users and search engines understand the structure of the page, making the content easier to read and navigate."
    }
  ]);

  const [openLesson, setOpenLesson] = useState(null);

  function openLessonHandler(lesson) {
    if (lesson.isLocked) return;
    setOpenLesson(lesson);
  }

  function setisComplete() {
    if (!openLesson) return;

    const openIndex = lessons.findIndex((l) => l.lesson === openLesson.lesson);

    setLessons(
      lessons.map((l, index) => {
        if (index === openIndex) {
          return { ...l, isCompleted: !l.isCompleted };
        }
        if (index === openIndex + 1) {
          return { ...l, isLocked: false };
        }
        return l;
      })
    );

    setOpenLesson(null);
  }

  const completedCount = lessons.filter((l) => l.isCompleted).length;
  const totalCount = lessons.length;
  const progressPercent = (completedCount / totalCount) * 100;

  if (openLesson !== null) {
    return (
      <div className="detail-view">
        <div className="detail-panel">
          <span className="eyebrow">Lesson overview</span>
          <h1>{openLesson.lesson}</h1>
          <p className="detail-text">{openLesson.details}</p>
          <div className="button-row">
            <button className="secondary-btn" onClick={() => setOpenLesson(null)}>
              Back
            </button>
            <button className="primary-btn" onClick={setisComplete}>
              {openLesson.isCompleted ? "Mark Incomplete" : "Complete lesson"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <span className="eyebrow">Front-end learning path</span>
        <h1>Learn Basic HTML</h1>
      </div>

      <p className="subtitle">Click a lesson to begin your next challenge.</p>

      <div className="status-row">
        <span>Your progress</span>
        <strong>
          {completedCount}/{totalCount}
        </strong>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="container">
        {lessons.map((l) => (
          <div
            key={l.lesson}
            className={`lesson-card ${l.isLocked ? "locked" : ""} ${l.isCompleted ? "completed" : ""}`}
            onClick={() => openLessonHandler(l)}
          >
            <div className="lesson-header">
              <p className="lesson-name">{l.lesson}</p>
              {l.isCompleted ? (
                <span className="tag complete">Done</span>
              ) : l.isLocked ? (
                <span className="tag locked-tag">Locked</span>
              ) : (
                <span className="tag available">Open</span>
              )}
            </div>
            <h5>{l.description}</h5>
          </div>
        ))}
      </div>
      <p>More coming soon...</p>
    </div>
  );
}

export default Practice;