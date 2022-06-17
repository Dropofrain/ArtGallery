import { Typography, Container, Box } from '@mui/material'
import React from 'react'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const Blogs = () => {
    return (
        <>
            <Navbar/>
            <Typography variant='h3' align='center' padding={5}>Blogs</Typography>
            <Container maxWidth='lg' padding={4} className='mx-auto'>
                <Box className='Blog' display={'flex'} sx={{
                    backgroundColor:'rgba(0,0,255,10%)',
                        
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,255,20%)',
                        
                    }
                }}>
                    <Box className='Blog-content' width={'75%'} padding={5}>
                        <Box clasName='Blog-title'>
                            <Typography variant='h4'fontWeight={'bold'}>
                            Blogs Title 
                            </Typography>
                            <hr/>
                            </Box>
                        
                        <Box className='Blog-text'>
                            <Typography variant='body1' align='justify'>
                            This is my blogs . plz check it .
                            write the pagrafe about the blog.
                            </Typography>
        
                        </Box>
                    </Box>
                    <Box className='Blogger-info' width={'25%'}padding={5}>
                        <Box className='Blogger-image' width={'100%'} borderRadius={'50%'}
                        overflow={'hidden'} backgroundColor="green">
                            <img src='./images/1image.png' width={'100%'}
                             sx={{
                                 transition:'2s',
                                '&:hover':{
                                    transform: 'Scale(1.2)'
                                }
                            }}/>
                        </Box>
                        <Box className='Blogger-name'>
                            <Typography variant='h5' align='right' fontWeight='bold'>
                            -Blogger
                            </Typography>
                                </Box>
                    </Box>
                </Box>
            </Container>

            <Footer/>
        </>
    )
}

export default Blogs