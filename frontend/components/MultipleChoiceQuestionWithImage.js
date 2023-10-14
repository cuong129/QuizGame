import ClickableMCAnswer from './ClickableMCAnswer';
import { Typography } from '@material-tailwind/react';
import { MC_LABELS, MC_ANSWERS } from '@/utils/constants';
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
        <div className='flex flex-col justify-center h-full'>
          <Typography className='font-extrabold text-center text-[38px]'>
            Trong đô thị trường hợp nào dưới đây xe không được dùng còi (trừ các
            xe ưu tiên theo Luật định)?
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
