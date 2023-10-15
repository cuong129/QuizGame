import DashboardLayout from '@/layouts/DashboardLayout';
import {
  Typography,
  IconButton,
  ButtonGroup,
  Button,
} from '@material-tailwind/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
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

export default function Dashboard() {
  const router = useRouter();
  const handleDownloadTemplate = () => {
    router.push('/template.csv');
  };
  const handleUploadFile = (event) => {
    // TODO: Upload to server
    console.log('selectedFile', event.target.files[0]);
  };
  return (
    <DashboardLayout>
      <div className='flex flex-row justify-between'>
        <Typography style={{ fontSize: 26 }} className='mb-4'>
          Quản lý câu hỏi
        </Typography>
        <ButtonGroup size='sm' className='h-[40px]' color='green'>
          <Button className='bg-green-500'>
            <label>
              Upload câu hỏi
              <input
                type='file'
                accept='.csv'
                className='hidden'
                onChange={handleUploadFile}
              />
            </label>
          </Button>
          <Button className='bg-blue-500' onClick={handleDownloadTemplate}>
            Download file mẫu
          </Button>
        </ButtonGroup>
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
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

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
    </DashboardLayout>
  );
}
