import { Typography, Button } from '@material-tailwind/react';
import Banner from './Banner';
import Image from 'next/image';
import { useRouter } from 'next/router';
import First from '../public/Icon 1st.png';
import Second from '../public/Icon 2nd.png';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

const ScoreLine = ({ index, name, score }) => {
  const imgSrc = index === 0 ? First : index === 1 ? Second : null;
  return (
    <div className='w-[45vw] h-[10vh] bg-white rounded-full flex justify-between items-center p-1 relative'>
      {!!imgSrc && (
        <Image
          src={imgSrc}
          width={80}
          height={95}
          alt='badge'
          className='absolute top-0 left-0 -translate-y-1/4 -translate-x-1/3'
        />
      )}
      <Typography className='text-[36px] uppercase font-extrabold ml-[100px]'>
        {name}
      </Typography>
      <div className='h-full w-[120px] bg-gradient-to-b from-[#1A6DE3] to-[#549BFF] rounded-full flex items-center justify-center'>
        <Typography className='text-white text-[40px] font-semibold'>
          {score}
        </Typography>
      </div>
    </div>
  );
};

export default function ScoreBoardScreen({ players, title }) {
  const router = useRouter();

  const handleFinish = () => {
    router.push('/');
  };

  const handleExportExcel = () => {
    let header = ['Tên đội', 'Tổng điểm'];
    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [header]);
    XLSX.utils.sheet_add_json(ws, players, { origin: 'A2', skipHeader: true });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true,
    });
    const finalData = new Blob([excelBuffer], { type: 'xlsx' });
    FileSaver.saveAs(finalData, 'Data.xlsx');
  };
  return (
    <div
      className='relative flex flex-col items-center justify-center w-screen h-screen'
      style={{
        backgroundImage: "url('/scoreboard.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Banner title={title} />
      <div className='grid gap-8'>
        {players
          .sort((a, b) => b.score - a.score)
          .map(({ name, score }, index) => (
            <ScoreLine key={index} name={name} score={score} index={index} />
          ))}
      </div>
      <div className='absolute flex justify-between mx-10 bottom-10'>
        <Button
          className='bg-primary-dark h-[60px] flex items-center justify-center border-2 border-white'
          onClick={handleExportExcel}
        >
          <Typography className='text-xl font-semibold'>Xuất Excel</Typography>
        </Button>
        <Button
          className='bg-primary-dark h-[60px] flex items-center justify-center border-2 border-white'
          onClick={handleFinish}
        >
          <Typography className='text-xl font-semibold'>Hoàn thành</Typography>
        </Button>
      </div>
    </div>
  );
}
