import { useState, useEffect, useRef } from 'react';
import { Input } from '../components/Input.tsx';
import { InputButton } from '../components/InputButton.tsx';
import { Output } from '../components/Output.tsx';
import { Sources } from '../components/Sources.tsx';
import { useConversation } from '../hooks/useConversation.ts';
import { useStream } from '../hooks/useStream.ts';
import { title, suggestions } from '../config.ts';
import type { FormEventHandler, ChangeEventHandler } from 'react';

export default function Main() {
  const [conversation, dispatch] = useConversation();
  const [startStream, isStreaming, outputStream, metadata] = useStream();
  const [inputValue, setInputValue] = useState('');
  const scrollableElement = useRef<HTMLDivElement>(null);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = event => {
    if (event) event.preventDefault();
    if (inputValue.trim().length > 0) dispatch({ type: 'setInput', value: inputValue });
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = event =>
    event.target instanceof HTMLInputElement && setInputValue(event.target.value);

  const toggleSuggestions = () => setSuggestionsVisible(!isSuggestionsVisible);

  useEffect(() => {
    if (outputStream.length > 0 && !isStreaming) {
      dispatch({ type: 'commit', value: outputStream, metadata });
    }
  }, [isStreaming, outputStream]);

  useEffect(() => {
    if (scrollableElement.current) {
      scrollableElement.current.scrollTop = scrollableElement.current.scrollHeight;
    }
  }, [conversation.input, outputStream, isSuggestionsVisible]);

  useEffect(() => {
    if (conversation.input.length > 0 && !isStreaming) {
      startStream(conversation.input, conversation);
      setInputValue('');
    }
  }, [conversation.input]);

  return (
    <main className="max-w-prose mx-auto h-screen">
      <div className="h-full relative flex flex-col">
        <header className="flex flex-row items-center justify-between py-4">
          <h1 className="text-3xl">{title}</h1>
          <a href="https://github.com/7-docs/7-docs" className="text-xs italic hover:underline">
            Powered by 7-docs
          </a>
        </header>

        <div
          className={`scrollbar scrollbar-vertical flex-grow-1 overflow-y-auto flex flex-col gap-2 pb-2`}
          ref={scrollableElement}>
          {conversation?.history.map((interaction, index, conversation) => (
            <>
              <Input>{interaction.input}</Input>
              <Output text={interaction.output} />
              {index === conversation.length - 1 ? <Sources metadata={interaction.metadata} /> : null}
            </>
          ))}

          {conversation.input ? <Input>{conversation.input}</Input> : null}

          <Output text={outputStream} />
        </div>

        <form
          className="flex flex-col gap-4 text-xl bg-dark-gray p-4 pt-6 border-gray border-t-1 sm:border sm:border-b-0"
          onSubmit={onSubmit}>
          {isSuggestionsVisible ? (
            <ul
              className="list-disc list-inside mb-2"
              onClick={event => {
                dispatch({ type: 'setInput', value: (event.target as HTMLElement).innerText });
                toggleSuggestions();
              }}>
              {suggestions.map(suggestion => (
                <li key={suggestion}>
                  <button className="italic text-sm py-1 hover:underline">{suggestion}</button>
                </li>
              ))}
            </ul>
          ) : null}

          <input
            type="text"
            name="query"
            placeholder="Ask me something..."
            value={inputValue}
            onChange={onChange}
            className="text-darker-gray flex flex-col flex-grow px-2 py-1 border-none"
          />

          <div className="flex flex-row gap-4 justify-end">
            <button
              type="button"
              className="bg-transparent appearance-none text-xs italic text-left cursor-pointer p-0 hover:underline flex-grow-1"
              onClick={toggleSuggestions}>
              Need suggestions?
            </button>

            <InputButton type="reset" value="Reset" onClick={() => dispatch({ type: 'reset' })} />
            <InputButton type="submit" value="Send" />
          </div>
        </form>
      </div>
    </main>
  );
}
