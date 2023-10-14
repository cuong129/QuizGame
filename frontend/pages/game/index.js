'use client';
import React, { useEffect, useState } from 'react';
import Banner from '@/components/Banner';
import { Button, Typography } from '@material-tailwind/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ScoreDrawer from '@/components/ScoreDrawer';
import DrawerButton from '@/components/DrawerButton';
import MultipleChoiceQuestionWithImage from '@/components/MultipleChoiceQuestionWithImage';
import Rule from '@/components/Rule';

export default function Game() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState([]);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [isStartGame, setIsStartGame] = useState(false);

  const [timerKey, setTimerKey] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const [answerClickCount, setAnswerClickCount] = useState(0);

  const isDisabledMCAnswer = answerClickCount === 2;

  const [isShowAnswer, setIsShowAnswer] = useState(false);

  useEffect(() => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get('topicId'));
    let newPlayers = urlParams.get('players')?.split(',');
    setPlayers(newPlayers);
    console.log(newPlayers);
    setIsLoading(true);
    // TODO: fetch api create Topic
    // (async () => {
    //   try {
    //     await new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve(true);
    //       }, 1000);
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // })();
  }, []);

  const handleShowCorrectAnswer = () => {
    setIsShowAnswer(true);
  };
  return (
    <>
      <div
        className='w-screen h-screen flex flex-col items-center justify-center'
        style={{
          backgroundImage: "url('/1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Banner title={'Tri thức an toàn'} />
        {!isStartGame ? (
          // BẮT ĐẦU THI
          <>
            <Rule />
            <Button
              className='bg-primary-dark h-[60px] flex items-center justify-center gap-3 w-60 !absolute right-[6.25vw] bottom-4 border-2 border-white'
              onClick={() => setIsStartGame(true)}
            >
              <Typography className='text-xl font-semibold'>
                BẮT ĐẦU THI
              </Typography>
              <ChevronDoubleRightIcon className='w-5 h-5' />
            </Button>
          </>
        ) : (
          // CÁC CÂU HỎI
          <>
            <div className='absolute right-10 top-5 bg-[#EDECEC] rounded-full'>
              <CountdownCircleTimer
                isPlaying={isCounting}
                key={timerKey}
                duration={5}
                colors={'#EC1C24'}
                size={150}
              >
                {({ remainingTime }) => (
                  <Typography className='text-5xl font-extrabold'>
                    {remainingTime}
                  </Typography>
                )}
              </CountdownCircleTimer>
            </div>

            <MultipleChoiceQuestionWithImage
              isDisabled={isDisabledMCAnswer}
              onClickAnswer={() => setAnswerClickCount((prev) => prev + 1)}
              isShowAnswer={isShowAnswer}
            />
            <div className='flex justify-between w-[87.5vw] absolute bottom-4'>
              <div className='flex gap-4'>
                <Button
                  className='bg-red-500 w-[150px] h-[60px] flex items-center justify-center border-2 border-white'
                  onClick={() => {
                    setTimerKey((prev) => prev + 1);
                    if (!isCounting) {
                      setIsCounting(true);
                    } else {
                      setIsCounting(false);
                    }
                  }}
                >
                  <Typography className='text-xl font-semibold'>
                    {isCounting ? 'Dừng lại' : 'Bắt đầu'}
                  </Typography>
                </Button>
                <Button
                  className='bg-primary h-[60px] flex items-center justify-center border-2 border-white'
                  onClick={handleShowCorrectAnswer}
                >
                  <Typography className='text-xl font-semibold'>
                    Đáp án đúng
                  </Typography>
                </Button>
              </div>
              <Button
                className='bg-primary-dark h-[60px] flex items-center justify-center border-2 border-white'
                onClick={() => {}}
              >
                <Typography className='text-xl font-semibold'>
                  Câu kế tiếp
                </Typography>
                <ChevronDoubleRightIcon className='w-5 h-5 ml-2' />
              </Button>
            </div>
          </>
        )}

        <DrawerButton onClick={() => setOpen(true)} />
      </div>
      <ScoreDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
