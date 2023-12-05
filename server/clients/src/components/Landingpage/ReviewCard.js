import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating } from "@mui/material";
import classes from "./ReviewCard.module.css";

const peoples = [
  {
    name: "John Abraham",
    content:
      "A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo.",
    img: "https://www.northeastern.edu/graduate/blog/wp-content/uploads/2020/11/jobinterviewetiquette_TW.jpg",
  },
  {
    name: "Sam Curran",
    content:
      "Each Material icon also has a  Filled (default), Outlined, Rounded, Two-tone, and Sharp. To import the icon component with a theme other than the default, append the theme name to the icon name",
    img: "https://dailypost.ng/wp-content/uploads/2022/06/istockphoto-518185032-612x612-1.jpeg",
  },
  {
    name: "Jennifer Lawrence",
    content:
      "A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information",
    img: "https://media.licdn.com/dms/image/C4D12AQF05L0hUtVWvQ/article-cover_image-shrink_600_2000/0/1620387590833?e=2147483647&v=beta&t=9ezpSlxEgXgZTnwz2UAtpX51KEhxwt8dWXE5FtNcZNs",
  },
  {
    name: "Alan",
    content:
      "A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZROthYts9p1XdxyGLGaCMM7bGW0elE_Uvpw&usqp=CAU",
  },
  {
    name: "Anne",
    content:
      "A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo.",
    img: "https://imageio.forbes.com/specials-images/imageserve/714717454/0x0.jpg?format=jpg&width=1200",
  },
];

export default function ReviewCard() {
  return (
    <div className={classes.cards}>
      <ul>
        {peoples.map((people) => (
          <li className={classes.cardList}>
            <Card sx={{ maxWidth: 345,height:'100%' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={people.img}
                  alt="Reviewers img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {people.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {people.content}
                    <br style={{ marginBottom: "2em" }} />

                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
