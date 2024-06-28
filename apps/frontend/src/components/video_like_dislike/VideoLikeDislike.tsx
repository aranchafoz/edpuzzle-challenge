import "./VideoLikeDislike.css";

interface VideoLikeDislikeProps {
  onGiveFeedback: (isPositive: boolean) => void;
}

export const VideoLikeDislike = ({ onGiveFeedback }: VideoLikeDislikeProps) => {
  const handleLike = () => {
    onGiveFeedback(true);
  };

  const handleDislike = () => {
    onGiveFeedback(false);
  };

  return (
    <div className="row">
      <div className="video-feedback-container">
        <button className="video-feedback-button" onClick={handleLike}>
          Like
        </button>
        <div className="divider" />
        <button className="video-feedback-button" onClick={handleDislike}>
          Dislike
        </button>
      </div>
    </div>
  );
};
