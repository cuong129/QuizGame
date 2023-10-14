import DashboardLayout from '@/layouts/DashboardLayout';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Button, IconButton, Chip } from '@material-tailwind/react';
import classNames from 'classnames';
import { AddQuestionsDialog } from '@/components/AddQuestionsDialog';

const TABLE_HEAD = ['Câu hỏi', 'Đáp án', 'Employed', ''];

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
];

export default function TopicDetail({ topicId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [notFound, setNotFound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const result = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(topicId === 'test1234');
          }, 1000);
        });
        setNotFound(result);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [topicId]);
  return (
    <DashboardLayout>
      {isLoading ? (
        <h1>loading...</h1>
      ) : notFound ? (
        <h1>404 Not Found</h1>
      ) : (
        <>
          <div class='w-max text-left mb-2'>
            <nav aria-label='breadcrumb' class='w-max'>
              <ol class='flex w-full flex-wrap items-center'>
                <li class='flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900'>
                  <Link class='opacity-70 hover:underline' href='/topic'>
                    <span>Quản lý bộ đề</span>
                  </Link>
                  <span class='pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased'>
                    -
                  </span>
                </li>
                <li class='flex items-center font-sans text-sm font-normal leading-normal text-green-500 cursor-pointer'>
                  {/* TODO: Topic name */}
                  {topicId}
                </li>
              </ol>
            </nav>
          </div>

          <div className='flex flex-row justify-between'>
            <div className='flex mb-4'>
              <Typography style={{ fontSize: 26 }}>{topicId}</Typography>
              <div className='flex items-center ml-4'>
                <Chip
                  variant='outlined'
                  value='Tiểu học'
                  size='sm'
                  color='blue'
                  className='bg-blue-50'
                />
              </div>
            </div>
            <Button
              className='bg-green-500 h-[40px]'
              onClick={() => setOpenDialog(true)}
            >
              Thêm câu hỏi
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
          <AddQuestionsDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          />
        </>
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps = ({ params }) => {
  return {
    props: { topicId: params.topicId },
  };
};
