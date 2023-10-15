import React, { useState } from 'react';
import classNames from 'classnames';
import { Typography } from '@material-tailwind/react';
const ClickableMCAnswer = ({
  text,
  label,
  answerLabel,
  isDisabled,
  onClick,
  isShowAnswer,
  isImageQuestion,
  isSelectStar,
  onToggleStar,
}) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const isShowCorrectAnswer = isShowAnswer && label === answerLabel;

  const handleClickAnswer = () => {
    if (isDisabled) return;
    onClick();
    setIsCorrectAnswer(label === answerLabel);
    if (label !== answerLabel && isSelectStar) {
      onToggleStar();
    }
  };
  return (
    <div
      className={classNames(
        'rounded-full p-[18px] flex items-center border-[3px] w-full h-[14vh] cursor-pointer',
        isShowCorrectAnswer
          ? 'bg-success border-white'
          : isCorrectAnswer === null
          ? 'bg-white border-primary'
          : isCorrectAnswer
          ? 'bg-success border-white'
          : 'bg-error border-white'
      )}
      onClick={handleClickAnswer}
    >
      <div
        className={classNames(
          'w-[calc(14vh-36px)] h-[calc(14vh-36px)] rounded-full flex items-center justify-center shadow-inner',
          isShowCorrectAnswer
            ? 'bg-white'
            : isCorrectAnswer === null
            ? 'bg-primary'
            : 'bg-white'
        )}
      >
        <Typography
          className={classNames(
            'text-5xl font-medium text-white align-middle',
            isShowCorrectAnswer
              ? 'text-success'
              : isCorrectAnswer === null
              ? 'text-white'
              : isCorrectAnswer
              ? 'text-success'
              : 'text-error'
          )}
        >
          {label}
        </Typography>
      </div>
      <Typography
        className={classNames(
          'text-[28px] font-semibold whitespace-normal ml-[18px]',
          isImageQuestion ? 'max-w-[32vw]' : 'max-w-[33vw] text-center',
          (isCorrectAnswer !== null || isShowCorrectAnswer) && 'text-white'
        )}
      >
        {text}
      </Typography>
    </div>
  );
};

export default ClickableMCAnswer;
