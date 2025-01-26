import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import person from '../assets/person.png';
import logo from '../assets/medgenlogoblue-removebg-preview (1).png';
import TextToSpeech from './TextToSpeech';
import TypeWriter from './TypeWriter';
/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, imageLink, ai = false } = props.message;
  // console.log("this is=> ",text)
  return (
    <div
      key={id}
      className={`${
        ai ? 'self-start' : 'self-end flex-row-reverse'
      } max-w-[75%] z-20 flex gap-2 p-2`}
    >
      <div className={`message__pic`}>
        <div className="avatar">
          <div className="w-8 border rounded-full">
            {ai ? <img width="30" src={logo} alt="Logo" /> : <img src={person} alt="profile pic" />}
          </div>
        </div>
      </div>
      <div
        className={`${
          ai ? 'bg-[--greenColor]' : 'bg-[--blueColor]'
        } relative message__wrapper p-3  rounded-xl`}
      >
        <ReactMarkdown
          className={`message__markdown  text-left text-black`}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || 'language-js');
              return (
                <code className={className} {...props}>
                  {children}{' '}
                </code>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>
        {/* {ai ? (<TypeWriter text={text} speed={20}></TypeWriter>): text} */}
        {imageLink && (
          <div className="w-[250px] h-[200px] overflow-hidden rounded-lg mt-1 ">
            {<img className="w-full h-full" src={imageLink} alt="preview" />}
          </div>
        )}
        <div className="text-left message__createdAt text-black self-end">
          {moment(createdAt).calendar()}
          <TextToSpeech content={text}></TextToSpeech>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
