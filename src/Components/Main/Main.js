import React, { useState } from 'react';
import './Main.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        background: 'linear-gradient(150deg, #34ace0 20%, #576574 80%, #222f3e 20%)'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const Main = () => {
    const classes = useStyles();

    const [postData, setPostData] = useState([])
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            setPostData(data.filter(item => item.id <= 9))
        })

    return (
        <>
            <NavBar />
            <section className="posts d-flex justify-content-between row w-100">
                {
                    postData.map((post, i) => {
                        const { id, body, title } = post
                        return (
                            <div key={id} className="col-md-4 my-4 d-flex justify-content-center">
                                <Card className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>{title[0].toUpperCase()}</Avatar>
                                        }
                                        title={title}
                                        subheader={new Date().toDateString()}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">{body}</Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <ThumbUpAltIcon />
                                        </IconButton>
                                        <IconButton className="mx-auto">
                                            <small>Comments</small>
                                        </IconButton>
                                        <IconButton aria-label="add to favorites">
                                            <ShareIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })
                }
            </section>
            <div className="background"></div>
        </>
    );
}

export default Main;