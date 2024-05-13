export interface CommentType {
  username: string;
  realtime: string;
  content: string;
}

const CommentContent = ({ commentData }: { commentData: CommentType }) => {
  return (
    <div className="px-4 mx-5 mt-4 rounded-lg bg-slate-50">
      <p className="text-lg font-semibold">{commentData.username}</p>
      <p className="text-sm text-gray-500">{commentData.realtime}</p>
      <p>{commentData.content}</p>
    </div>
  );
};

export default CommentContent;
