import ClickableMCAnswer from './ClickableMCAnswer';
import { Typography } from '@material-tailwind/react';
import { MC_LABELS, MC_ANSWERS } from '@/utils/constants';
import Image from 'next/image';
const MultipleChoiceQuestionWithImage = ({
  isDisabled,
  onClickAnswer,
  isShowAnswer,
}) => {
  return (
    <div className='flex h-[60vh] w-[87.5vw] mt-[10vh] justify-between'>
      <div className='bg-white rounded-xl w-1/2 p-8 shadow relative mr-12'>
        <div className='w-[108px] h-[40px] bg-primary-1 flex items-center justify-center rounded-t-2xl absolute top-0 -translate-y-full'>
          <Typography className='text-xl font-semibold text-white'>
            Câu 01
          </Typography>
        </div>
        <div className='flex flex-col h-full'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='mx-auto w-full h-[70%] rounded-xl'
            alt='image'
            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
          />
          <Typography className='font-extrabold text-center text-[38px] mt-4'>
            Theo hướng mũi tên, những hướng nào xe mô tô được phép đi?
          </Typography>
        </div>
      </div>
      <div className='flex flex-col justify-between w-1/2'>
        {MC_ANSWERS.map((item, index) => (
          <ClickableMCAnswer
            key={item}
            text={item}
            label={MC_LABELS[index]}
            answerLabel={'A'}
            isDisabled={isDisabled}
            onClick={onClickAnswer}
            isShowAnswer={isShowAnswer}
            isImageQuestion
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionWithImage;
