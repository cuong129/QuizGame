import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Spinner,
  IconButton,
  Checkbox,
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const TABLE_HEAD = ['', 'Câu hỏi', 'Đáp án', 'Employed'];

const TABLE_ROWS = [
  {
    name: 'John Michael',
    job: 'Manager',
    date: '23/04/18',
  },
  {
    name: 'Alexa Liras',
    job: 'Developer',
    date: '23/04/18',
  },
  {
    name: 'Laurent Perrier',
    job: 'Executive',
    date: '19/09/17',
  },
  {
    name: 'Michael Levi',
    job: 'Developer',
    date: '24/12/08',
  },
  {
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
  {
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
  {
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
  {
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
];

const DEFAULT_CHECKEDLIST = [].fill(false, 0, TABLE_ROWS.length);

export function AddQuestionsDialog({ open, onClose }) {
  const [checkedList, setCheckedList] = useState(DEFAULT_CHECKEDLIST);

  const checkedCount = checkedList.filter((x) => x).length;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSelectQuestion = (index) => {
    let newCheckedList = [...checkedList];
    newCheckedList[index] = !newCheckedList[index];
    setCheckedList(newCheckedList);
  };

  const handleCreateTopic = async () => {
    setIsLoading(true);
    // TODO: fetch api create Topic
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    } finally {
      setIsLoading(false);
      handleOpen(false);
      router.push('/topic/test-123443');
    }
  };
  const handleClose = () => {
    onClose(false);
    setCheckedList(DEFAULT_CHECKEDLIST);
  };
  return (
    <Dialog open={open} size='lg' handler={handleClose}>
      <DialogHeader className='text-lg'>Thêm câu hỏi</DialogHeader>
      <DialogBody divider>
        <Typography className='mb-3'>
          Đã chọn <span className='font-bold'>{checkedCount}</span> câu hỏi
          trong tổng số <span className='font-bold'>{TABLE_ROWS.length}</span>{' '}
          câu hỏi hiện có
        </Typography>
        <div className='max-h-[30rem] overflow-scroll'>
          <table className='border border-blue-gray-100 w-full min-w-max table-auto text-left bg-white shadow '>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-bold leading-none opacity-70 uppercase'
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, job, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={name}>
                    <td className={classNames(classes, 'w-[50px]')}>
                      <Checkbox
                        checked={checkedList[index]}
                        onChange={() => handleSelectQuestion(index)}
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {date}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
          disabled={isLoading || checkedCount.length === 0}
        >
          {isLoading && <Spinner className='h-4 w-4 absolute left-4' />}
          <span>Thêm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
