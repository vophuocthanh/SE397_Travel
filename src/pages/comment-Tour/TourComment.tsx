import React, { useState, useEffect } from "react";
import { request } from "@/lib/request";
import axios from "axios";
import { useParams } from "react-router-dom";
import TourCommentContent from "./Components/TourCommentContent";

export interface CommentType {
  id: string;
  message: string;
  userID: string | null;
  tourID: string;
  timestamp: string;
}

const TourComment = () => {
  const [comment, setComment] = useState<string>("");

  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tourId } = useParams();
  // const dynamicId = locationId ? locationId : tourId;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await request.get(`/message/${tourId}`);
        setComments(response.data.data.data);
        setLoading(false);
        console.log("data cmt", response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Error fetching comments");
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/message/${tourId}/message`,
        {
          message: comment,
        }
      );

      const newComment = response.data.data;

      setComments((prevComments) => [newComment, ...prevComments]);

      console.log("Response:", newComment);
      setComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container p-4 mx-auto">
      <div className="p-2 rounded-lg bg-slate-300">
        <h2 className="px-10 pt-10 text-xl font-bold">Viết bình luận ... </h2>
        <div className="flex gap-8 mt-8">
          <textarea
            style={{ outline: "none", padding: "30px" }}
            placeholder="Nhập nội dung ..."
            value={comment}
            onChange={handleChange}
            className="w-[80rem] flex justify-center items-center ml-[4rem] rounded-sm px-2"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className={`px-4 py-2 m-10 ml-10 font-bold text-white rounded ${
            comment.trim()
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Gửi
        </button>
        <div>
          {comments.length > 0 &&
            comments.map((commentData) => (
              <TourCommentContent key={commentData.id} commentData={commentData} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TourComment;
