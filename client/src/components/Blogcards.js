import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentRoundedIcon from "@material-ui/icons/ModeCommentRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Divider, Grid, Paper, Button } from "@material-ui/core";
// import { Form, Field } from "react-final-form";
// import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  palette: {
    primary: {
      main: "#ff8f00", // This is an orange looking color
    },
  },
}));

export default function BlogCard({ postId }) {
  // const [color, changecolor] = useState(false)
  const [iconColor, changecolor] = useState("grey");
  const classes = useStyles();
  const [post, setPost] = React.useState({
    blog: "",
    username: "D",
    date: "2020-07-09",
    title: "",
  
    category: "",
    image: "",
  });
  const [like,isLike]=useState(false)
  const [diableLike,setDisableLike]=useState(false)
  const [imagedisplay, setimage] = useState("blog1.webp");

  const imagedynamic = async (cat) => {
    var imagenumber = Math.floor((Math.random() * 7))+1;
    const imagedisplay = cat + imagenumber + ".jpeg";
   
   await  setimage(imagedisplay);
   console.log("Image is- ",imagedisplay)
  };
  const [expanded, setExpanded] = React.useState(false);
  const [commentexpanded, setcommentExpanded] = React.useState(false);

  React.useEffect(async () => {
    console.log(postId);
    var url = "http://127.0.0.1:8080/post/" + postId;
   
  axios
      .get(url)
      .then(async (res) => {
        await setPost(res.data);
        imagedynamic(res.data.category);
       
      })

      .catch((err) => {
        console.log(err);
      });


var FavPost=[]
const token=localStorage.getItem("auth_token");
axios.get('http://127.0.0.1:8080/user',{
  headers:{
    'access-token':token
  }
}).then(res=>{
  
  FavPost=[...res.data['Favourite']]
  isLike(FavPost.includes(postId))
  if (FavPost.includes(postId)) {changecolor("red"); setDisableLike(true)};

}).catch(err=>{
  console.log(err)
})

  }, [postId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  const handlecommentExpandClick = () => {
    setcommentExpanded(!commentexpanded);
  };

  const handleFav = () => {
    if (localStorage.getItem('auth_token')){
    const url = "http://127.0.0.1:8080/posts/like/" + postId;
    changecolor("red") ; setDisableLike(true)
    axios
      .get(
        url,
        { headers: { "access-token": localStorage.getItem("auth_token") } },
        {}
      )
      .then((res) => {
        console.log(res, "response regarding likes");
        
      })
      .catch((err) => console.log(err));}
      else
      alert('You need to login first')

   
   
  };

  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  return (
    <article className="panel__wrapper">
      {post.username && (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {post.username[0].toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={<b>{post.username}</b>}
            subheader={post.date.slice(0, 10)}
          />
          <CardMedia
            className={classes.media}
            image={imagedisplay}

            title="Paella dish"
          />

          <CardContent>
            <Typography
              variant="body1"
             
              component="p"
              style={{ fontSize: "15px", width: window.innerWidth * 0.7 }}
            >
              {post.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" disabled={diableLike} onClick={handleFav}>
              <span style={{ color: iconColor }}>
                <FavoriteIcon />
              </span>
</IconButton>
              <IconButton
                aria-label="comment"
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handlecommentExpandClick}
                aria-expanded={commentexpanded}
                aria-label="show more"
              >
                <ModeCommentRoundedIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
           
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph style={{ fontSize: "18px" }}>
                Blog:
              </Typography>
              <Typography >
                <p style={{ fontSize: "15px" }}>{post.blog}</p>
              </Typography>
            </CardContent>
          </Collapse>
          {/* /////////////comment box///////////////////////////////////////////////////////////////////// */}
          <Collapse in={commentexpanded} timeout="auto" unmountOnExit>
            <Paper style={{ padding: "20px 10px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp" src={imgLink} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h6 style={{ margin: 0, textAlign: "left", fontWeight: 600 }}>
                    Rajesh
                  </h6>
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "1em",
                    }}
                  >
                    <form style={{ marginTop: "4px", width: "100%" }}>
                      <TextField
                        variant="fullWidth"
                        id="comment"
                        label="comment"
                        placeholder="Add comment"
                        variant="outlined"
                        style={{ padding: "0px" }}
                      />
                      <Button
                        type="button"
                        variant="contained"
                        style={{ fontSize: "10px", padding: "1px" }}
                        // disabled={submitting || pristine}
                      >
                        Post
                      </Button>
                    </form>
                  </p>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp" src={imgLink} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h6 style={{ margin: 0, textAlign: "left", fontWeight: 600 }}>
                    Rajesh
                  </h6>
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "0.85em",
                    }}
                  >
                    amazing.{" "}
                  </p>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp" src={imgLink} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h6 style={{ margin: 0, textAlign: "left", fontWeight: 600 }}>
                    Bharat
                  </h6>
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "0.85em",
                    }}
                  >
                    This is the blog which can change life.{" "}
                  </p>
                  {/* <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p> */}
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Card>
      )}{" "}
    </article>
  );
}