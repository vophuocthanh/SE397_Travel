import { CommentType } from "../TourComment";

const TourCommentContent = ({ commentData }: { commentData: CommentType }) => {
  console.log("dataProps", commentData);
  // const timestamp = new Date().toISOString();
  // Lấy thời gian hiện tại của máy khách
  const localDate = new Date();

  // Lấy các thành phần của thời gian hiện tại
  const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
  const day = localDate.getDate().toString().padStart(2, "0");
  const year = localDate.getFullYear();
  let hours = localDate.getHours();
  const minutes = localDate.getMinutes().toString().padStart(2, "0");
  const seconds = localDate.getSeconds().toString().padStart(2, "0");

  // Định dạng giờ theo AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Chuyển đổi sang định dạng 12 giờ

  // Định dạng thời gian theo định dạng mong muốn
  const formattedTimestamp = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;

  console.log(formattedTimestamp);

  return (
    <div
      className="px-4 m-8 mx-5 mt-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md"
      key={commentData.id}
    >
      {/* <p className="mb-2 text-lg font-semibold">{commentData.id}</p> */}
      <p className="mb-4 text-sm text-gray-700">
        <span className="text-lg font-semibold">Content : </span>
        {commentData.message}
      </p>
      <p className="mb-1 font-black text-gray-600">
        {" "}
        <span className="text-lg font-semibold">User ID: </span>{" "}
        {commentData.userID}
      </p>
      <p className="mb-1 text-gray-600">
        {" "}
        <span className="text-lg font-semibold">Tour ID: </span>
        {commentData.tourID}
      </p>
      <p className="mb-1 text-gray-600">
        <span className="text-lg font-semibold">Timestamp: </span>
        <span className="text-sm">{formattedTimestamp}</span>
      </p>
    </div>
  );
};

export default TourCommentContent;
