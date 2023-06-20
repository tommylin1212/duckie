import { ChangeEventHandler, FormEventHandler } from "react";

interface ChatInputProps {
  input: string;
  handleInputChange: ChangeEventHandler<HTMLTextAreaElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

const ChatInput = ({ input, handleInputChange, handleSubmit }: ChatInputProps) => (
  <div className="flex flex-none justify-center bg-base-100 p-4">
    <form className="flex w-full " onSubmit={handleSubmit}>
      <textarea
        className="textarea-bordered textarea textarea-lg w-full"
        value={input}
        onChange={handleInputChange}
      />
      <div className="flex flex-col justify-center p-2">
        <button className="btn-neutral btn" type="submit">
          Analyze Code
        </button>
      </div>
    </form>
  </div>
);

export default ChatInput;
