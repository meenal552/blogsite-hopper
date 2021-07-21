import React from "react";
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
}));

export default function BlogCard({ postId }) {
  const classes = useStyles();
//   const [post, setPost] = React.useState();
  const [expanded, setExpanded] = React.useState(false);
  const [commentexpanded, setcommentExpanded] = React.useState(false);

//   React.useEffect(() => {
//     axios.get("http://127.0.0.1:9000/post/" + postId).then((res) => {
//       console.log(res.data);
//     });
//   }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handlecommentExpandClick = () => {
    setcommentExpanded(!commentexpanded);
  };
  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  return (
    <article className="panel__wrapper">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image="blog1.webp"
          title="Paella dish"
        />
        <CardContent>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ fontSize: "15px" }}
          >
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
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
              Method:
            </Typography>
            <Typography paragraph style={{ fontSize: "15px" }}>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph style={{ fontSize: "15px" }}>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
            </Typography>
            <Typography paragraph style={{ fontSize: "15px" }}>
              Add rice and stir very gently to distribute.
            </Typography>
            <Typography style={{ fontSize: "15px" }}>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
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
                  you are beautiful.{" "}
                </p>
                {/* <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p> */}
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
      </Card>
    </article>
  );
}