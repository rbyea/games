import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getCommentsList } from "../../../store/commentsSlice";
import { FaWindowClose } from "react-icons/fa";
import { getAuthId } from "../../../store/usersSlice";

const Comment = (props) => {
  const dispatch = useDispatch();
  const commentsList = useSelector(getCommentsList());
  const authUser = useSelector(getAuthId());

  const handleRemove = (e, commentId) => {
    e.preventDefault();
    dispatch(deleteComment(commentId));
  };

  return (
    <>
      {commentsList.length > 0 ? (
        <div>
          {commentsList.map((comment) => (
            <div key={comment._id} className="media mb-4 comment-item">
              {authUser === comment.userId ||
              authUser === "64b9893927897bef82caa12e" ? (
                <a
                  href="#"
                  onClick={(e) => handleRemove(e, comment._id)}
                  className="comment-delete"
                >
                  <FaWindowClose />
                </a>
              ) : null}

              <img className="d-flex mr-3 rounded-circle" src="" alt="" />
              <div className="media-body text-white-50">
                <h6 className="mt-0 text-white">{comment.name}</h6>
                {comment.description}
              </div>
            </div>
          ))}
        </div>
      ) : (
        "Комментарий пока нет"
      )}
    </>
  );
};

export default Comment;
