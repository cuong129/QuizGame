import ClickableMCAnswer from './ClickableMCAnswer';
import { Typography } from '@material-tailwind/react';
import { MC_LABELS } from '@/utils/constants';

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80';

const MultipleChoiceQuestionWithImage = ({
  index,
  data,
  isDisabled,
  onClickAnswer,
  isShowAnswer,
}) => {
  const { request, answer, correctAnswer, imageURL } = data;

  const url = imageURL ?? DEFAULT_IMAGE_URL;
  const choices = getChoicesByAnswer(answer);

  return (
    <div className='flex w-[87.5vw] mt-[10vh] justify-between h-[60vh]'>
      <div className='relative w-1/2 p-8 mr-12 bg-white shadow rounded-xl'>
        <div className='w-[108px] h-[40px] bg-primary-1 flex items-center justify-center rounded-t-2xl absolute top-0 -translate-y-full'>
          <Typography className='text-xl font-semibold text-white'>
            {`Câu ${(index + 1).toString().padStart(2, '0')}`}
          </Typography>
        </div>
        <div className='flex flex-col h-full'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='mx-auto w-full h-[70%] rounded-xl'
            alt='image'
            src={url}
          />
          <Typography className='font-extrabold text-center text-[38px] mt-4'>
            {request}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col justify-between w-1/2'>
        {choices.map((item, index) => (
          <ClickableMCAnswer
            key={item + index}
            text={item}
            label={MC_LABELS[index]}
            answerLabel={correctAnswer}
            isShowAnswer={isShowAnswer}
            isDisabled={isDisabled}
            onClick={onClickAnswer}
            isImageQuestion
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionWithImage;
