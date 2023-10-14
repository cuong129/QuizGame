import MCAnswer from './MCAnswer';
import { Typography } from '@material-tailwind/react';
import { MC_LABELS, MC_ANSWERS } from '@/utils/constants';

const MultipleChoiceQuestion = ({
  isDisabled,
  onClickAnswer,
  isShowAnswer,
}) => {
  return (
    <div>
      <div className='bg-white rounded-xl p-8 w-[87.5vw] h-[23.2vh] mt-[10vh] shadow relative'>
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
      <div className='mt-[68px] grid grid-cols-2 gap-8'>
        {MC_ANSWERS.map((item, index) => (
          <MCAnswer
            key={item}
            text={item}
            label={MC_LABELS[index]}
            answerLabel={'A'}
            isShowAnswer={isShowAnswer}
          />
        ))}

        {/* <ClickableMCAnswer
          text={
            'Khi qua nơi đông người tụ họp, đi lại trên đường đi lại trên đường'
          }
          label={MC_LABELS[0]}
          answerLabel={'A'}
          isDisabled={isDisabled}
          onClick={onClickAnswer}
          isShowAnswer={isShowAnswer}
        />
        <ClickableMCAnswer
          text={'Khi qua nơi đông người tụ họp, đi lại trên đường'}
          label={MC_LABELS[1]}
          answerLabel={'A'}
          isDisabled={isDisabled}
          onClick={onClickAnswer}
          isShowAnswer={isShowAnswer}
        />
        <ClickableMCAnswer
          text={
            'Khi qua nơi đông người tụ họp, đi lại trên đường đi lại trên đường đi lại trên đường đi lại trên đường đi lại trên đường'
          }
          label={MC_LABELS[2]}
          answerLabel={'A'}
          isDisabled={isDisabled}
          onClick={onClickAnswer}
          isShowAnswer={isShowAnswer}
        />
        <ClickableMCAnswer
          text={'Khi qua nơi đông người tụ họp, đi lại trên đường'}
          label={MC_LABELS[3]}
          answerLabel={'A'}
          isDisabled={isDisabled}
          onClick={onClickAnswer}
          isShowAnswer={isShowAnswer}
        /> */}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
