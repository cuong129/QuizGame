import { Drawer, Typography, IconButton } from '@material-tailwind/react';

export default function ScoreDrawer({ open, onClose }) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      className='bg-white flex flex-col items-center'
      size={694}
    >
      <Typography className='uppercase font-extrabold text-[40px] mt-[124px] mb-[90px] text-primary-dark'>
        Thống kê điểm thi
      </Typography>
      <ScoreField name={'TH Lương Văn Can'} />
      <ScoreField name={'TH Lê Văn Tám'} />
      <ScoreField name={'TH Tân Quý'} />
      <ScoreField name={'TH Bình Long'} />
    </Drawer>
  );
}

const ScoreField = ({ name }) => {
  return (
    <div className='border-[3px] rounded-full w-[90%] border-gray-300 relative mb-10'>
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
          10
        </Typography>
      </div>

      <div className='absolute right-[35px] top-1/2 -translate-y-1/2 flex flex-col'>
        <IconButton
          variant='text'
          className='opacity-30 hover:opacity-80'
          onClick={() => {}}
        >
          <i class='fa-solid fa-caret-up fa-3x'></i>
        </IconButton>
        <IconButton
          variant='text'
          className='opacity-30 hover:opacity-80'
          onClick={() => {}}
        >
          <i class='fa-solid fa-caret-down fa-3x'></i>
        </IconButton>
      </div>
    </div>
  );
};
