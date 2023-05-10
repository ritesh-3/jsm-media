import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Loader, Videos } from './'
import {  fetchFromAPI } from '../utils/fetchFromAxios';

const VideoDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetails(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id])

  if (!videoDetails?.snippet) return <Loader />


  const { snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount } } = videoDetails;

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`https://www/youtube.com/watch?v=${id}`}
              className='react-player' controls />
            <Typography color='#fff' variant="h5" fontWeight='bold' p={5} >
              {title}
            </Typography>
            <Stack direction='row' justifyContent='space-between'
              sx={{ color: '#fff' }} py={1} px={2} >
              <Link to={`/channel/${channelId}`}  >
                <Typography variant='h6' color='#fff' border='1px solid red' p={1} borderRadius='24px' >
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} ></CheckCircle>
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center' >
                <Typography variant="body1" sx={{ opacit: 0.7 }} > {parseInt(viewCount).toLocaleString()} views </Typography>
                <Typography variant="body1" sx={{ opacit: 0.7 }} > {parseInt(likeCount).toLocaleString()} likes </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center' >
          <Videos direction='column' videos={videos} />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetails