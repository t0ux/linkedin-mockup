import React, { useState, useEffect } from "react";
import "./Feed.css";
import { Avatar } from "@material-ui/core";
import InputOption from "./InputOption";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import VideocamIcon from "@material-ui/icons/Videocam";
import EventIcon from "@material-ui/icons/Event";
import DescriptionIcon from "@material-ui/icons/Description";
import Posts from "./Posts";
import { db } from "./Firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import NewPostModal from "./NewPostModal";
import FlipMove from "react-flip-move";

function Feed() {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    db.collection("posts")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="feed">
      <div className="feed__inputArea">
        <div className="feed__input">
          <Avatar className="feed__pfp" src={user.url} />
          <button
            aria-label="newpost"
            onClick={() => {
              setCloseModal(!closeModal);
            }}
          >
            Start a post
          </button>
        </div>
        <NewPostModal closeModal={closeModal} setCloseModal={setCloseModal} />
        <div className="feed__inputOptions">
          <InputOption
            text={"Photo"}
            color={"#70B5F9"}
            Image={PhotoSizeSelectActualIcon}
          />
          <InputOption text={"Video"} color={"#7FC15E"} Image={VideocamIcon} />
          <InputOption text={"Event"} color={"#E7A33E"} Image={EventIcon} />
          <InputOption
            text={"Write article"}
            color={"#F5987E"}
            Image={DescriptionIcon}
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(
          ({
            id,
            data: { name, description, message, url, image, video, time },
          }) => {
            return (
              <Posts
                key={id}
                id={id}
                name={name}
                description={description}
                message={message}
                url={url}
                image={image}
                video={video}
                time={time}
              />
            );
          }
        )}
      </FlipMove>
    </div>
  );
}

export default Feed;
