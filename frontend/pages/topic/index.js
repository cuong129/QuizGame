import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Typography, Button, IconButton } from '@material-tailwind/react';
import classNames from 'classnames';
import { TopicDialog } from '@/components/TopicDialog';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TABLE_HEAD = ['Bộ đề', 'Số lượng câu hỏi', 'Loại đề', ''];

const TABLE_ROWS = [
  {
    name: 'John Michael',
    job: 10,
    date: '23/04/18',
  },
  {
    name: 'Alexa Liras',
    job: 12,
    date: '23/04/18',
  },
  {
    name: 'Laurent Perrier',
    job: 10,
    date: '19/09/17',
  },
  {
    name: 'Michael Levi',
    job: 9,
    date: '24/12/08',
  },
  {
    name: 'Richard Gran',
    job: 10,
    date: '04/10/21',
  },
];

export default function Topic() {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      <DashboardLayout>
        <div className='flex flex-row justify-between'>
          <Typography style={{ fontSize: 26 }} className='mb-4'>
            Quản lý bộ đề
          </Typography>
          <Button
            className='bg-green-500 h-[40px]'
            onClick={() => setOpenDialog(true)}
          >
            Thêm bộ đề
          </Button>
        </div>
        <table className='border border-blue-gray-100 w-full min-w-max table-auto text-left bg-white shadow'>
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
                  <td className={classes}>
                    <Link href={`/topic/${name}`}>
                      <Typography
                        variant='small'
                        color='blue'
                        className='font-normal hover:underline'
                      >
                        {name}
                      </Typography>
                    </Link>
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
                  <td className={classNames(classes, 'w-[50px]')}>
                    <IconButton variant='text' color='red'>
                      <i className='fas fa-trash' />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DashboardLayout>
      <TopicDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
