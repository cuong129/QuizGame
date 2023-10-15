import {
  Drawer,
  Typography,
  IconButton,
  Button,
} from '@material-tailwind/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

export default function ScoreDrawer({
  open,
  onClose,
  players,
  isDisabledCounter,
  isStar,
  setScore,
}) {
  const [isSubmitScore, setIsSubmitScore] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const handleSubmit = () => {
    setIsSubmitScore(true);
    setIsDisable(true);
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      className='bg-white flex flex-col items-center py-[10vh] px-[50px]'
      size={694}
    >
      <Typography className='uppercase font-extrabold text-[40px]  text-primary-dark mb-[60px]'>
        Thống kê điểm thi
      </Typography>
      <div className='w-full flex flex-col items-center'>
        {players.map(({ name, score }, index) => (
          <ScoreField
            key={index}
            name={name}
            score={score}
            setScore={setScore(index)}
            isSubmit={isSubmitScore}
            isDisabledCounter={isDisabledCounter}
            isStar={isStar}
          />
        ))}
      </div>
      {isDisabledCounter && (
        <Button
          className='bg-primary-dark w-[160px] h-[60px] self-end align-bottom justify-end mt-[60px]'
          onClick={handleSubmit}
          disabled={isDisable}
        >
          <Typography className='text-[20px] font-semibold'>
            Lưu điểm
          </Typography>
        </Button>
      )}
    </Drawer>
  );
}

const SCORE_BY_POSITION = [30, 25, 20, 15];
const ScoreField = ({
  name,
  isDisabledCounter,
  isSubmit,
  isStar,
  score,
  setScore,
}) => {
  const [squares, setSquares] = useState(Array(5).fill(false));
  const [scoreSquares, setScoreSquares] = useState(Array(4).fill(false));

  const bonusScore = isStar ? 20 : 10;

  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    if (isSubmit && !isCalculated) {
      const index = scoreSquares.findIndex((x) => x);
      setScore(SCORE_BY_POSITION[index] ?? 0);
      setIsCalculated(true);
    }
  }, [isSubmit, isCalculated, scoreSquares, setScore]);

  const onToggleSquare = (index) => {
    if (isSubmit) return;
    const newSquares = [...squares];
    newSquares[index] = !newSquares[index];
    setSquares(newSquares);
  };

  const onToggleScoreSquare = (index) => {
    if (isSubmit) return;
    const newScoreSquares = Array(4).fill(false);
    newScoreSquares[index] = true;
    setScoreSquares(newScoreSquares);
  };

  return (
    <div
      className={classNames(
        'border-[3px] w-full border-gray-300 relative mb-10',
        isDisabledCounter ? 'rounded-l-full' : 'rounded-full'
      )}
    >
      <Typography className='text-[28px] font-extrabold my-[30px] ml-[150px]'>
        {name}
      </Typography>
      <div
        className=' bg-black w-[130px] h-[130px] flex items-center 
                  justify-center rounded-full border-4 border-primary-1
                  bg-gradient-to-b from-[#1A6DE3] to-[#549BFF]
                  absolute -left-2 top-1/2 -translate-y-1/2'
      >
        <Typography className='text-[40px] font-semibold text-white'>
          {score}
        </Typography>
      </div>
      {isDisabledCounter ? (
        <div>
          <div className='absolute right-[2px] top-1/2 -translate-y-1/2 flex flex-col'>
            {squares.map((value, index) => (
              <Square
                key={index}
                isCheck={value}
                onToggle={() => onToggleSquare(index)}
              />
            ))}
          </div>
          <div className='absolute bottom-[-3px] translate-y-full left-[150px] flex'>
            {scoreSquares.map((value, index) => (
              <ScoreSquare
                key={index}
                value={index + 1}
                isCheck={value}
                onToggle={() => onToggleScoreSquare(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='absolute right-[35px] top-1/2 -translate-y-1/2 flex flex-col'>
          <IconButton
            variant='text'
            className='opacity-30 hover:opacity-80'
            onClick={() => setScore(bonusScore)}
          >
            <i className='fa-solid fa-caret-up fa-3x'></i>
          </IconButton>
          <IconButton
            variant='text'
            className='opacity-30 hover:opacity-80'
            disabled={score === 0}
            onClick={() => setScore(-10)}
          >
            <i className='fa-solid fa-caret-down fa-3x'></i>
          </IconButton>
        </div>
      )}
    </div>
  );
};

const Square = ({ isCheck, onToggle }) => {
  return (
    <div
      className={classNames(
        'w-[16px] h-[16px] my-[2px] cursor-pointer',
        isCheck ? 'bg-primary' : 'bg-blue-50'
      )}
      onClick={onToggle}
    ></div>
  );
};

const ScoreSquare = ({ value, isCheck, onToggle }) => {
  return (
    <div
      className={classNames(
        'w-[24px] h-[24px] mx-[2px] flex items-center justify-center cursor-pointer',
        isCheck ? 'bg-primary' : 'bg-blue-50'
      )}
      onClick={onToggle}
    >
      <Typography
        className={classNames(
          'font-bold',
          isCheck ? 'text-white' : 'text-primary'
        )}
      >
        {value}
      </Typography>
    </div>
  );
};
