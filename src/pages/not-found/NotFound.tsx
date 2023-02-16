import { Box, Typography } from '@mui/material';
export default function NotFound() {
    return (
        <>
            <Box className='w-full h-full flex flex-col items-center justify-center'>
                <p className='bg-white text-red-600 text-[4rem] font-extrabold mb-[1.5rem]'>404</p>
                <p className='bg-[red] text-[white] text-[4rem] font-extrabold mb-[1.5rem]'>
                    Not Found
                </p>
            </Box>
        </>
    );
}
