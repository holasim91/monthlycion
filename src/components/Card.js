import React from 'react'
import { Grid, Image, Text } from '../elements'

import {history} from '../redux/configStore'

const Card = (props) => {
        const{ user_name, post_id, image_url } = props
    return (
        <Grid padding='16px' background='#FFF' is_flex margin='8px 0' _onClick={()=>{history.push(`/post/${post_id}`)}}>
        <Grid width='auto' margin='0 8px 0 0'>
            <Image shape='square'  size={85} src={image_url}/>
        </Grid>
        <Grid >
            <Text>
                <b>{user_name} </b>님이 좋아요를 누르셨습니다
            </Text>
        </Grid>
        </Grid>
)
}

Card.defaultProps = {
    user_name:'user_name',
    image_url: 'http://via.placeholder.com/400x300',
    post_id: null
}

export default Card
