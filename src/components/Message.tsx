type MessageProps = {
  text?: string;
};

function Message({ text = "Hello!" }: MessageProps) {
  return <p>{text}</p>;
}

export default Message;
