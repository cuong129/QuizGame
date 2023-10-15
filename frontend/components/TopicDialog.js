import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Radio,
  Typography,
  Spinner,
  Checkbox,
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ApiCreateTopic } from '@/utils/endpoints';
export function TopicDialog({ open, onClose }) {
  const [name, setName] = useState('');
  const [isPrimary, setIsPrimary] = useState(true);
  const [isRandom, setIsRandom] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateTopic = async () => {
    setIsLoading(true);
    // TODO: fetch api create Topic (isRandom flag)
    try {
      const response = await axios.post(ApiCreateTopic, {
        name,
        schoolLevel: isPrimary ? 'TH' : 'THCS',
        isRandom
      });
      if (response?.id) {
        router.push(`/topic/${id}`);
      }
    } finally {
      setIsLoading(false);
      handleOpen(false);
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };
  return (
    <Dialog open={open} size='md' handler={handleClose}>
      <DialogHeader className='text-lg'>Thêm bộ đề</DialogHeader>
      <DialogBody divider>
        <form className='my-4'>
          <div className='w-full mb-4'>
            <Input
              label='Tên bộ đề'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex gap-10 items-center'>
            <Typography>Loại bộ đề:</Typography>
            <Radio
              name='type'
              label='Tiểu học'
              color='blue'
              checked={isPrimary}
              onChange={() => setIsPrimary(true)}
            />
            <Radio
              name='type'
              height={'10px'}
              label='Trung học cơ sở'
              color='blue'
              checked={!isPrimary}
              onChange={() => setIsPrimary(false)}
            />
          </div>
          <Checkbox
            label={
              <span>
                Tạo ngẫu nhiên bộ đề{' '}
                <span className='font-bold'>Tri thức an toàn</span>
              </span>
            }
            checked={isRandom}
            onChange={() => setIsRandom((prev) => !prev)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant='text'
          color='red'
          onClick={handleClose}
          className='mr-1'
        >
          <span>Huỷ</span>
        </Button>
        <Button
          className='flex w-[120px] justify-center relative'
          variant='gradient'
          color='blue'
          onClick={handleCreateTopic}
          disabled={isLoading || !name}
        >
          {isLoading && <Spinner className='h-4 w-4 absolute left-4' />}
          <span>Thêm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
