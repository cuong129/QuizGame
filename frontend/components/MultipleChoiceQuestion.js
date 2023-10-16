import React, { useState } from 'react';
import MCAnswer from './MCAnswer';
import { Typography } from '@material-tailwind/react';
import { MC_LABELS } from '@/utils/constants';
import { getChoicesByAnswer } from '@/utils/utilities';
import ClickableMCAnswer from './ClickableMCAnswer';
import classNames from 'classnames';

const MultipleChoiceQuestion = ({
  index,
  data,
  hasLuckyStar,
  isDisabled,
  onClickAnswer,
  isShowAnswer,
  isSelectStar,
  onToggleStar,
}) => {
  const { request, answer, correctAnswer } = data;

  const choices = getChoicesByAnswer(answer);

  return (
    <div>
      <div className='bg-white rounded-xl p-8 w-[87.5vw] h-[23.2vh] mt-[10vh] shadow relative'>
        <div className='w-[108px] h-[40px] bg-primary-1 flex items-center justify-center rounded-t-2xl absolute top-0 -translate-y-full'>
          <Typography className='text-xl font-semibold text-white'>
            {`Câu ${(index + 1).toString().padStart(2, '0')}`}
          </Typography>
        </div>
        {hasLuckyStar && (
          <div
            className='absolute cursor-pointer bottom-3 right-3'
            onClick={onToggleStar}
          >
            <i
              className={classNames(
                'fa-solid fa-star fa-3x',
                isSelectStar ? 'text-amber-500' : 'text-gray-200'
              )}
            ></i>
          </div>
        )}
        <div className='flex flex-col justify-center h-full'>
          <Typography className='font-extrabold text-center text-[38px]'>
            {request}
          </Typography>
        </div>
      </div>
      <div className='mt-[68px] grid grid-cols-2 gap-8'>
        {choices.map((item, index) =>
          !hasLuckyStar ? (
            <MCAnswer
              key={item + index}
              text={item}
              label={MC_LABELS[index]}
              answerLabel={correctAnswer}
              isShowAnswer={isShowAnswer}
            />
          ) : (
            <ClickableMCAnswer
              key={item + index}
              text={item}
              label={MC_LABELS[index]}
              answerLabel={correctAnswer}
              isShowAnswer={isShowAnswer}
              isDisabled={isDisabled}
              onClick={onClickAnswer}
              isSelectStar={isSelectStar}
              onToggleStar={onToggleStar}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
