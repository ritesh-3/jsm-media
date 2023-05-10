import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import { Videos, ChannelCard } from './'
import { fetchFromAPI } from "../utils/fetchFromAxios"

const ChannelDetails = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {

    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => {
      setVideos(data?.items)
    })

  }, [id])
  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(230,214,245,1) 0%, rgba(243,242,247,1) 77%, rgba(214,245,240,1) 100%)',
          zIndex: 10,
          height: '300px'
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetails
