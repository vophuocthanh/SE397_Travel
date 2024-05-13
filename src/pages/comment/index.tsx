import React, { useState } from "react";
import CommentContent, { CommentType } from "./Components/Comment";

const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    const currentDate = new Date().toLocaleString();
    const newComment: CommentType = {
      username: "John Doe",
      realtime: currentDate,
      content: comment,
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="p-2 bg-slate-300">
        <h2 className="text-xl font-bold">Viết bình luận ... </h2>
        <div className="flex gap-8">
          <textarea
            placeholder="Nhập nội dung ..."
            value={comment}
            onChange={handleChange}
            className={`w-[80rem] flex justify-center items-center text-center ml-[4rem] `}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className={`px-4 py-2 mt-6 ml-10 font-bold text-white rounded ${
            comment.trim()
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Gửi
        </button>
        <div>
          {comments.map((commentData, index) => (
            <CommentContent key={index} commentData={commentData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
