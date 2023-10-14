import {
  Typography,
  Option,
  Button,
  Input,
  IconButton,
  Chip,
} from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Banner from '@/components/Banner';
import { useRouter } from 'next/router';
import Link from 'next/link';
const TOPICS = [
  {
    value: '123123',
    label: 'Bộ đề 1',
  },
  {
    value: '1231237657',
    label: 'Bộ đề 2',
  },
  {
    value: '76867',
    label: 'Bộ đề 3',
  },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    height: '64px',
    'min-height': '64px',
    'border-radius': 999,
  }),
};

export default function Home() {
  const [topic, setTopic] = useState(null);
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isExistPlayer = players.some((x) => x.trim() === name.trim());

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (isExistPlayer) return;
      handleAddPlayer();
    }
  };
  const handleAddPlayer = () => {
    setPlayers([...players, name]);
    setName('');
  };

  const handleDeletePlayer = (name) => {
    setPlayers(players.filter((x) => x !== name));
  };

  const handleStartGame = () => {
    const queryParams = new URLSearchParams({
      topicId: topic?.value,
      players: players,
    }).toString();
    router.push(`/game?${queryParams}`);
  };

  return (
    <div
      className='w-screen h-screen flex justify-center'
      style={{
        backgroundImage: "url('/start.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Banner title={'Thiết lập lượt chơi'} />
      <div className='w-[45vw] h-[65vh] bg-white rounded-[24px] border-[3px] border-primary p-12 relative mt-[221px]'>
        <Typography className='text-xl font-semibold leading-6 mb-5'>
          CHỌN BỘ ĐỀ
        </Typography>
        <div className='mb-10'>
          <Select
            className='basic-single'
            isLoading={isLoading}
            isSearchable
            value={topic}
            options={TOPICS}
            placeholder='Hãy chọn 1 bộ đề đã khởi tạo'
            onChange={(e) => setTopic(e)}
            styles={customStyles}
          />
        </div>
        <Typography className='text-xl font-semibold leading-6 mb-5'>
          THÊM ĐỘI CHƠI
        </Typography>
        <div className='relative flex w-full mb-4'>
          <Input
            type='text'
            placeholder='Nhập tên đội'
            className='!border-1 !border-gray-400 bg-white focus:!border-blue-400 text-[17px] rounded-full pr-20'
            labelProps={{
              className: 'hidden',
            }}
            containerProps={{ className: 'min-w-0 h-16' }}
            value={name}
            onChange={({ target }) => setName(target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            size='lg'
            className='!absolute right-2 top-2 rounded-full bg-primary'
            onClick={handleAddPlayer}
            disabled={!name || isExistPlayer}
          >
            <i className='fas fa-plus' />
          </IconButton>
        </div>
        <div className='flex flex-wrap gap-2'>
          {players.length > 0 &&
            players.map((player) => (
              <Chip
                key={player}
                value={player}
                variant='ghost'
                onClose={() => handleDeletePlayer(player)}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 50 },
                }}
                className='rounded-full normal-case text-base'
                color='blue'
              />
            ))}
        </div>

        <Button
          className='bg-primary-dark h-[60px] flex items-center justify-center gap-3 !absolute right-12 bottom-12 w-60'
          onClick={handleStartGame}
        >
          <Typography className='text-xl font-semibold'>
            BẮT ĐẦU CHƠI
          </Typography>
          <ChevronDoubleRightIcon className='w-5 h-5' />
        </Button>
      </div>
    </div>
  );
}
